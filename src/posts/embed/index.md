---
title: 'Embedding Static Data Directly Into C Executables'
description: 'Simplifying the surprisingly tricky task of embedding data in C using xxd.'
author: 'Dalton Luce'
date: '2024-12-21'
tags:
    - 'c'
    - 'linux'
    - 'build-systems'
    - 'automation'
    - 'unix'
    - 'cli'
---

# Embedding Static Data Directly Into C Executables

<img src="/posts/embed/embed.webp" alt="An abstract depiction of embedding data in an executable" style="
 display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
"/>

_<p style="text-align: center;">[DALL·E's](https://openai.com/index/dall-e-3/) interpretation of "embedding data within an executable"</p>_

## The Problem

While working on my CLI Celestial Viewer project, [astroterm](https://github.com/da-luce/astroterm), I encountered a tricky issue when building the executable. Initially, I used relative paths to reference external data files, such as:

```tex
../data/some_data
```

This worked fine when running the program from the project directory. However, once the program was installed as an executable, the relative path no longer pointed to a valid location when run elsewhere, resulting in errors like this:

```text
Couldn't open file '../data/some_data'
Abort trap: 6
```

How could I use the data file without relying on the executable being run from a single, specific directory? As potentially given away by the title of this post, it's to embed the data directly _within_ the executable.

## A Cross-platform Solution

Embedding data in a C program simply means turning a static file into a C array, filled with the exact same data as the original file. This allows the file to be compiled directly into the executable, effectively bundling it together with the application. The result is a self-contained executable that can run anywhere, without relying on external files, making distribution and portability much easier.

Now, there are several ways of doing so, and various compilers provide their own methods. However, I was looking for something portable (as least on Unix-like operating systems), so, I turned t a helpful little Unix tool called [`xxd`](https://linux.die.net/man/1/xxd). This tool converts binary files into a C-style hex dump, which can then be directly embedded into your source code. For instance,

```bash
xxd -i some_data some_data_embedded.h
```

will take `some_data` and create `some_data_embedded.h`, which will have contents similar to the following:

```c
unsigned char _current_dir_some_data[] = {
    0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x6a, 0xdc, 0xff, 0xff,
    0x01, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00,
    0x20, 0x00, 0x00, 0x00, 0x00, 0x00, 0x80, 0x3f, 0x75, 0x98, 0xcc, 0x34
};

unsigned int _current_dir_some_data = 32;
```

Now, you can use `_current_dir_some_data` anywhere within your program and it will always be available!

### Naming Caveats

Note that the name of the array that `xxd` produces includes the directory from which the command was run. Normally, this is fine as we can simply rename it ourselves after the fact. Additionally, _some_ operating systems, such as [FreeBSD](https://www.freebsd.org/), provide a [`-n` option](https://man.freebsd.org/cgi/man.cgi?query=xxd) to specify what the array should be named.

However, what if we have to produce the embed file every time we build? Say we have data that will not/cannot be stored within the project, but is downloaded upon install. In this case, it would be rather frustrating to have users manually rename the generated files. We also can't rely on the `-n` option always being available.

The solution? Rename the arrays using _another_ CLI tool, [`sed`](<https://www.gnu.org/software/sed/manual/sed.html>):

```bash
xxd -i "$INPUT" | \
    sed "s/unsigned char [^ ]*/unsigned char ${ARRAY_NAME}[]/" | \
    sed "s/unsigned int [^ ]*/unsigned int ${ARRAY_NAME}_len/" > "$OUTPUT"
```

This will produce a file with name `$OUTPUT` from the `$INPUT` file, with the array named `$ARRAY_NAME`.

### Putting it to Use

We don't want to have users do run all these commands manually. Ideally, it should be built directly into our build system and run automatically. First, I usually silo these commands into a single scrip, say `embed.sh`:

```bash
# Usage: embed.sh [infile [outfile]] 
# The array will have the same name as the outfile, minus the extension

if [ "$#" -ne 2 ]; then
    echo "Usage: $0 <input_file> <output_file>"
    exit 1
fi

INPUT="$1"
OUTPUT="$2"

# Extract the base filename without extension (this will be the array name)
ARRAY_NAME=$(basename "$OUTPUT" | sed 's/\(.*\)\..*/\1/')

xxd -i "$INPUT" | \
    sed "s/unsigned char [^ ]*/unsigned char ${ARRAY_NAME}[]/" | \
    sed "s/unsigned int [^ ]*/unsigned int ${ARRAY_NAME}_len/" > "$OUTPUT"

# Check for success
if [ $? -eq 0 ]; then
    echo "Successfully generated $OUTPUT with array name '${ARRAY_NAME}_array'"
else
    echo "Error generating $OUTPUT"
    exit 1
fi
```

When using the [Meson Build system](https://mesonbuild.com/), I add something like the following command to generate the embed file during building:

```python
embed_file = configure_file(
    input: 'data/some_data.txt',
    output: 'embed_file.h',
    command: [
        'sh', 'embed.sh', '@INPUT@', '@OUTPUT@'
    ]
)
project_source_files += [embed_file]
```
