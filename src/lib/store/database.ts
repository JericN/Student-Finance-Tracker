import { BudgetPref, Category, Template, Wallet, Wishlist } from '$lib/models/sft';
import { type Store, initStore } from '$lib/store/templates/DatabaseTemplate';
import { getContext, hasContext, setContext } from 'svelte';

const CATEGORY = Symbol('category');
const TEMPLATE = Symbol('template');
const WALLET = Symbol('wallet');
const WISHLIST = Symbol('wishlist');
const BUDGETPREF = Symbol('budgetpref');

export function init() {
    setContext(CATEGORY, initStore<Category>('categories', Category));
    setContext(TEMPLATE, initStore<Template>('transaction-templates', Template));
    setContext(WALLET, initStore<Wallet>('wallets', Wallet));
    setContext(WISHLIST, initStore<Wishlist>('wishlist', Wishlist));
    setContext(BUDGETPREF, initStore<BudgetPref>('budgetpref', BudgetPref));
}

export function getCategoryStore() {
    if (!hasContext(CATEGORY)) throw new Error('No category store initialized');
    return getContext<Store<Category>>(CATEGORY);
}

export function getTemplateStore() {
    if (!hasContext(TEMPLATE)) throw new Error('No template store initialized');
    return getContext<Store<Template>>(TEMPLATE);
}

export function getWalletStore() {
    if (!hasContext(WALLET)) throw new Error('No wallet store initialized');
    return getContext<Store<Wallet>>(WALLET);
}

export function getWishlistStore() {
    if (!hasContext(WISHLIST)) throw new Error('No wishlist store initialized');
    return getContext<Store<Wishlist>>(WISHLIST);
}

export function getBudgetPrefStore() {
    if (!hasContext(BUDGETPREF)) throw new Error('No budget preference initialized');
    return getContext<Store<BudgetPref>>(BUDGETPREF);
}
