<script>
  let isOpen = false;

  // Function to toggle mobile menu
  function toggleMenu() {
    isOpen = !isOpen;
  }
</script>

<header>
  <div class="logo">Your Name</div>
  <nav class={isOpen ? 'navigation open' : 'navigation'}>
    <a href="#home">Home</a>
    <a href="#projects">Projects</a>
    <a href="#about">About</a>
    <a href="#contact">Contact</a>
  </nav>
  <button class="menu-toggle" on:click={toggleMenu}>
    {#if isOpen}
      Close
    {:else}
      Menu
    {/if}
  </button>
</header>

<style>
header {
  background-color: black;
  color: off-white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em;
}

header .logo {
  font-size: 1.5em;
  font-weight: bold;
}

header .navigation {
  display: flex;
}

header .navigation.open {
  flex-direction: column;
  position: absolute;
  top: 60px; /* Adjust based on header height */
  left: 0;
  width: 100%;
  background-color: black;
}

header .navigation a {
  color: off-white;
  text-decoration: none;
  margin: 0 10px;
}

header .navigation a:hover {
  text-decoration: underline;
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  color: off-white;
}

@media (max-width: 600px) {
  .menu-toggle {
    display: block;
  }

  header .navigation {
    display: none;
  }

  header .navigation.open {
    display: flex;
  }
}

</style>