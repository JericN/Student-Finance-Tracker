import {
    Category,
    CategoryForm,
    Template,
    TemplateForms,
    Transaction,
    TransactionForm,
    Wallet,
    WalletForm,
} from '$lib/models/types';
import { type Store, initStore } from './model/FormTemplate';
import { getContext, hasContext, setContext } from 'svelte';
import { assert } from '$lib/assert';

const CREATETRANSACTION = Symbol('createtransaction');
const EDITTRANSACTION = Symbol('edittransaction');
const CREATEWALLET = Symbol('createwallet');
const EDITWALLET = Symbol('editwallet');
const CREATETEMPLATE = Symbol('createtemplate');
const EDITTEMPLATE = Symbol('edittemplate');
const CREATECATEGORY = Symbol('createcategory');
const EDITCATEGORY = Symbol('editcategory');

export function init() {
    setContext(CREATETRANSACTION, initStore<TransactionForm>());
    setContext(EDITTRANSACTION, initStore<Transaction>());
    setContext(CREATEWALLET, initStore<WalletForm>());
    setContext(EDITWALLET, initStore<Wallet>());
    setContext(CREATETEMPLATE, initStore<Template>());
    setContext(EDITTEMPLATE, initStore<Template>());
    setContext(CREATECATEGORY, initStore<TransactionForm>());
    setContext(EDITCATEGORY, initStore<TransactionForm>());
}

export function transactionCreate() {
    assert(hasContext(CREATETRANSACTION), 'Create transaction store not initialized');
    return getContext<Store<TransactionForm>>(CREATETRANSACTION);
}

export function transactionEdit() {
    assert(hasContext(EDITTRANSACTION), 'Edit transaction store not initialized');
    return getContext<Store<Transaction>>(EDITTRANSACTION);
}

export function walletCreate() {
    assert(hasContext(CREATEWALLET), 'Create wallet store not initialized');
    return getContext<Store<WalletForm>>(CREATEWALLET);
}
export function walletEdit() {
    assert(hasContext(EDITWALLET), 'Edit wallet store not initialized');
    return getContext<Store<Wallet>>(EDITWALLET);
}

export function templateCreate() {
    assert(hasContext(CREATETEMPLATE), 'Create template store not initialized');
    return getContext<Store<TemplateForms>>(CREATETEMPLATE);
}

export function templateEdit() {
    assert(hasContext(EDITTEMPLATE), 'Edit template store not initialized');
    return getContext<Store<Template>>(EDITTEMPLATE);
}

export function categoryCreate() {
    assert(hasContext(CREATECATEGORY), 'Create category store not initialized');
    return getContext<Store<CategoryForm>>(CREATECATEGORY);
}

export function categoryEdit() {
    assert(hasContext(EDITCATEGORY), 'Edit category store not initialized');
    return getContext<Store<Category>>(EDITCATEGORY);
}
