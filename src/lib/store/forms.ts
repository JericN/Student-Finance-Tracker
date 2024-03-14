import { Record, Template, Transaction, Wallet, WalletRecord } from '$lib/models/types';
import { type Store, initStore } from './model/FormTemplate';
import { getContext, hasContext, setContext } from 'svelte';
import { assert } from '$lib/assert';

const CREATETRANSACTION = Symbol('createtransaction');
const EDITTRANSACTION = Symbol('edittransaction');
const CREATEWALLET = Symbol('createwallet');
const EDITWALLET = Symbol('editwallet');
const CREATETEMPLATE = Symbol('createtemplate');
const EDITTEMPLATE = Symbol('edittemplate');

export function init() {
    setContext(CREATETRANSACTION, initStore<Record>());
    setContext(EDITTRANSACTION, initStore<Transaction>());
    setContext(CREATEWALLET, initStore<WalletRecord>());
    setContext(EDITWALLET, initStore<Wallet>());
    setContext(CREATETEMPLATE, initStore<Template>());
    setContext(EDITTEMPLATE, initStore<Template>());
}

export function transactionCreate() {
    assert(hasContext(CREATETRANSACTION), 'Create transaction store not initialized');
    return getContext<Store<Record>>(CREATETRANSACTION);
}

export function transactionEdit() {
    assert(hasContext(EDITTRANSACTION), 'Edit transaction store not initialized');
    return getContext<Store<Transaction>>(EDITTRANSACTION);
}

export function walletCreate() {
    assert(hasContext(CREATEWALLET), 'Create wallet store not initialized');
    return getContext<Store<WalletRecord>>(CREATEWALLET);
}
export function walletEdit() {
    assert(hasContext(EDITWALLET), 'Edit wallet store not initialized');
    return getContext<Store<Wallet>>(EDITWALLET);
}

export function templateCreate() {
    assert(hasContext(CREATETEMPLATE), 'Create template store not initialized');
    return getContext<Store<Template>>(CREATETEMPLATE);
}

export function templateEdit() {
    assert(hasContext(EDITTEMPLATE), 'Edit template store not initialized');
    return getContext<Store<Template>>(EDITTEMPLATE);
}
