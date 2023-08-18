<script lang="ts">
    import AnimatedIcon from './components/header/AnimatedIcon.svelte'
    import svelteLogo from '../assets/svelte.svg'
    import Icon from './Icon.svelte'

    let nav_items = [
        { name: 'home', href: '#home', color: '#e27878', id: 1 },
        { name: 'experience', href: '#experience', color: '#b4be82', id: 2 },
        { name: 'contact', href: '#contact', color:'#b4be82', id: 3 },
        { name: 'about', href: '#about', color: '#84a0c6', id: 4 },
    ];
    let active_nav_id = -1;

    let social_icons = [

    ];
</script>

<header class="site-header">
    <div class="wrapper site-header__wrapper">
        <div class="logo-and-name">
            <img src={svelteLogo} class="logo" alt="Vite Logo" />
            <h3>Dalton Luce</h3>
        </div>
        <nav class="nav-items">
            {#each nav_items as item, index (item.id)}
                <div class="nav-item">
                    <p style:opacity={active_nav_id == item.id ? 1 : 0} style:color={item.color}>●</p>
                    <a
                        target="_blank"
                        rel="noreferrer"
                        href={item.href}
                        style="color: {item.color};"
                        on:mouseenter={() => {
                            active_nav_id = item.id
                        }}
                        on:mouseleave={() => {
                            active_nav_id = -1
                        }}
                    >
                        {item.name}
                    </a>
                </div>
            {/each}
        </nav>
        <div class="social-icons">
            <Icon name="trash" />
        </div>
    </div>
</header>

<style>
    .site-header {
        top: 0;
        width: 100%;
        background-color: var(--background-primary);
    }

    .site-header__wrapper {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        flex-wrap: wrap;
    }

    .site-header__wrapper > div {
        /* Have items take up equal space */
        flex: 1 1 0px;
    }

    .logo-and-name > * {
        display: inline-block;
    }

    .nav-items {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        gap: 2rem;
    }

    .nav-item {
        display: flex;
        align-items: center;
    }

    .nav-item > a {
        text-decoration: none;
    }

    .nav-item > p {
        transition: 0.2s;
        padding: 0rem 0.25rem 0rem 0rem;
        font-weight: bolder;
    }
</style>