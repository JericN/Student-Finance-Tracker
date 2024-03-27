import { Category, Template, Transaction, Wallet } from '$lib/models/types';
import { type Store, initStore } from '$lib/store/model/DatabaseTemplate';
import { getContext, hasContext, setContext } from 'svelte';

const CATEGORY = Symbol('category');
const TEMPLATE = Symbol('template');
const TRANSACTIONS = Symbol('transactions');
const WALLET = Symbol('wallet');

export function init() {
    setContext(CATEGORY, initStore<Category>('categories', Category));
    setContext(TEMPLATE, initStore<Template>('transaction-templates', Template));
    setContext(TRANSACTIONS, initStore<Transaction>('transactions', Transaction));
    setContext(WALLET, initStore<Wallet>('wallets', Wallet));
}

export function getCategoryStore() {
    if (!hasContext(CATEGORY)) throw new Error('No category store initialized');
    return getContext<Store<Category>>(CATEGORY);
}

export function getTemplateStore() {
    if (!hasContext(TEMPLATE)) throw new Error('No template store initialized');
    return getContext<Store<Template>>(TEMPLATE);
}

export function getTransactionStore() {
    if (!hasContext(TRANSACTIONS)) throw new Error('No transaction store initialized');
    return getContext<Store<Transaction>>(TRANSACTIONS);
}

export function getWalletStore() {
    if (!hasContext(WALLET)) throw new Error('No wallet store initialized');
    return getContext<Store<Wallet>>(WALLET);
}
