<script lang="ts">
    import IconBase from './IconBase.svelte'

    export let title: string = 'External link'
    export let strokeWidth: number = 1

    const path = 'M7 7h8.586L5.293 17.293l1.414 1.414L17 8.414V17h2V5H7v2z'
</script>

<IconBase {path} {title} {strokeWidth} viewBoxWidth={25} viewBoxHeight={25} />
