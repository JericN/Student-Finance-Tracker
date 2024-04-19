<script lang="ts">
    import { Card } from '$lib/components/modules';
    import type { NameNumber } from '$lib/models/types';
    import { currency } from '$lib/functions/helper';
    import { makeCategoryList } from '$lib/functions/analytics';

    export let data: { income: NameNumber; expense: NameNumber };
    export let currentType: string;

    $: categoryList = makeCategoryList(data);
</script>

<Card layout="flex flex-col gap-2">
    {#each currentType === 'Income' ? categoryList.income : categoryList.expense as { name, amount, icon, percent }}
        <div class="flex justify-between text-sm">
            <p>{icon} {name}</p>

            <div class="grid grid-cols-[auto_40px] gap-2">
                <p class="text-right">{currency(amount)}</p>

                <p class="grid h-5 w-10 place-items-center rounded-md bg-primary-700 text-xs leading-none text-white">
                    {percent}%
                </p>
            </div>
        </div>
    {/each}
</Card>
