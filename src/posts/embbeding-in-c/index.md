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

How could I ensure the data file was accessible without depending on the executable being run from a specific directory? The solution, as hinted at in the title of this post, is to embed the data directly _within_ the executable.

## A Modern Solution

First off, what does embedding mean? We certainly aren't talking about [embedded software](https://en.wikipedia.org/wiki/Embedded_software) (sorry folks, no Arduinos here). Instead, embedding data in a C program simply means turning a static file into a C array, filled with the exact same data as the original file. This allows the file to be compiled directly into the executable, effectively bundling it together with the application. The result is a self-contained executable that can run anywhere, without relying on external files, making distribution and portability much easier.

In the [`C23`](https://en.cppreference.com/w/c/23) standard, the language introduces a new `#embed` directive that enables the embedding of data directly into executables.

The `#embed` directive allows you to specify a file at compile time, and the compiler automatically embeds the data as a byte array in the program. For example:

```c
#include <stddef.h>

const char my_data[] = {#embed "some_data.txt"};
const size_t my_data_len = sizeof(my_data);
```

While this is very clean and effective, `#embed` requires a [C23-compliant compiler](https://en.cppreference.com/w/c/compiler_support/23), and will not be available in all environments. For projects targeting older standards, legacy systems, or toolchains that lack `C23` support, an alternative solution is necessary.

## A Cross-platform Solution

While looking for a portable solution (at least on Unix-like operating systems), I turned to a helpful little Unix tool called [`xxd`](https://linux.die.net/man/1/xxd). This tool converts binary files into a C-style hex dump, which can then be directly embedded into your source code. For instance,

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

Now, you can use `_current_dir_some_data` anywhere within your program, and it will always be available!

### Naming Caveats

Note that the name of the array that `xxd` produces includes the directory from which the command was run. Normally, this is fine, as we can simply rename it ourselves after the fact. Additionally, _some_ operating systems, such as [FreeBSD](https://www.freebsd.org/), provide an [`-n` option](https://man.freebsd.org/cgi/man.cgi?query=xxd) to specify what the array should be named.

However, what if we have to produce the embedded file every time we build? Say we have data that will not/cannot be stored within the project but is downloaded upon install. In this case, it would be rather frustrating to have users manually rename the generated files. We also can't rely on the `-n` option always being available.

The solution? Rename the arrays using yet _another_ CLI tool, [`sed`](<https://www.gnu.org/software/sed/manual/sed.html>):

```bash
xxd -i "$INPUT" | \
    sed "s/unsigned char [^ ]*/unsigned char ${ARRAY_NAME}[]/" | \
    sed "s/unsigned int [^ ]*/unsigned int ${ARRAY_NAME}_len/" > "$OUTPUT"
```

This will produce a file with name `$OUTPUT` from the `$INPUT` file, with the array named `$ARRAY_NAME`.

### Putting it to Use

We don't want to have users run all these commands manually. Ideally, it should be built directly into our build system and run automatically. We can silo these tasks into a single script, say `embed.sh`:

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

_Et voilà_! We have successfully embedded static data directly into our C executable, ensuring it’s always available, regardless of where the program is run. Happy coding! 🎉
