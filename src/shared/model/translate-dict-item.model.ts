export interface ITranslateDictItem {
  id?: number;
  languageId?: number;
  dictTableName?: string;
  dictTablePkId?: number;
  dictEnumKey?: string;
  itemTranslation?: string;
  translateDescription?: any;
  sortOrder?: number;
}

export const updatableFields = ['id', 'itemTranslation', 'translateDescription'];

export const defaultValue: Readonly<ITranslateDictItem> = {};
