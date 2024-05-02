import {
    Category,
    CategoryForm,
    Template,
    TemplateForm,
    Transaction,
    TransactionForm,
    Wallet,
    WalletForm,
    Wishlist,
    WishlistForm,
    BudgetPref,
    BudgetPrefForm,
} from '$lib/models/sft';
import { type Store, initStore } from './templates/FormTemplate';
import { getContext, hasContext, setContext } from 'svelte';
import { assert } from '$lib/functions/assert';

const CREATETRANSACTION = Symbol('createtransaction');
const EDITTRANSACTION = Symbol('edittransaction');
const CREATEWALLET = Symbol('createwallet');
const EDITWALLET = Symbol('editwallet');
const CREATETEMPLATE = Symbol('createtemplate');
const EDITTEMPLATE = Symbol('edittemplate');
const CREATECATEGORY = Symbol('createcategory');
const EDITCATEGORY = Symbol('editcategory');
const CREATEWISHLIST = Symbol('createwishlist');
const EDITWISHLIST = Symbol('editwishlist');
const EDITBUDGETPREF = Symbol('editbudgetpref');

export function init() {
    setContext(CREATETRANSACTION, initStore<TransactionForm>());
    setContext(EDITTRANSACTION, initStore<Transaction>());
    setContext(CREATEWALLET, initStore<WalletForm>());
    setContext(EDITWALLET, initStore<Wallet>());
    setContext(CREATETEMPLATE, initStore<Template>());
    setContext(EDITTEMPLATE, initStore<Template>());
    setContext(CREATECATEGORY, initStore<TransactionForm>());
    setContext(EDITCATEGORY, initStore<TransactionForm>());
    setContext(CREATEWISHLIST, initStore<WishlistForm>());
    setContext(EDITWISHLIST, initStore<Wishlist>());
    setContext(EDITBUDGETPREF, initStore<BudgetPref>());
}

export function getTransactionCreateStore() {
    assert(hasContext(CREATETRANSACTION), 'Create transaction store not initialized');
    return getContext<Store<TransactionForm>>(CREATETRANSACTION);
}

export function getTransactionEditStore() {
    assert(hasContext(EDITTRANSACTION), 'Edit transaction store not initialized');
    return getContext<Store<Transaction>>(EDITTRANSACTION);
}

export function getWalletCreateStore() {
    assert(hasContext(CREATEWALLET), 'Create wallet store not initialized');
    return getContext<Store<WalletForm>>(CREATEWALLET);
}
export function getWalletEditStore() {
    assert(hasContext(EDITWALLET), 'Edit wallet store not initialized');
    return getContext<Store<Wallet>>(EDITWALLET);
}

export function getTemplateCreateStore() {
    assert(hasContext(CREATETEMPLATE), 'Create template store not initialized');
    return getContext<Store<TemplateForm>>(CREATETEMPLATE);
}

export function getTemplateEditStore() {
    assert(hasContext(EDITTEMPLATE), 'Edit template store not initialized');
    return getContext<Store<Template>>(EDITTEMPLATE);
}

export function getCategoryCreateStore() {
    assert(hasContext(CREATECATEGORY), 'Create category store not initialized');
    return getContext<Store<CategoryForm>>(CREATECATEGORY);
}

export function getCategoryEditStore() {
    assert(hasContext(EDITCATEGORY), 'Edit category store not initialized');
    return getContext<Store<Category>>(EDITCATEGORY);
}

export function getWishlistCreateStore() {
    assert(hasContext(CREATEWISHLIST), 'Create wishlist store not initialized');
    return getContext<Store<WishlistForm>>(CREATEWISHLIST);
}

export function getWishlistEditStore() {
    assert(hasContext(EDITWISHLIST), 'Edit wishlist store not initialized');
    return getContext<Store<Wishlist>>(EDITWISHLIST);
}

export function getBudgetPrefEditStore() {
    assert(hasContext(EDITBUDGETPREF), 'Edit budget preference store not initialized');
    return getContext<Store<BudgetPref>>(EDITBUDGETPREF);
}