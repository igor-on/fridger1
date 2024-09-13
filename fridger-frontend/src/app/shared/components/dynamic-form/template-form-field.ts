import { ComponentType } from '@angular/cdk/portal';
import { Injectable, Type } from '@angular/core';
import { FormGroup, ValidatorFn } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';
import { Observable } from 'rxjs';

export enum ControlType {
  TEXT,
  GROUP,
  SELECT,
  DATE,
  COMPONENT,
  ARRAY,
  CHECKBOX,
}

/**
 * defined what type of control should be rendered
 */
export type AnyControlType =
  | ControlType.TEXT
  | ControlType.GROUP
  | ControlType.SELECT
  | ControlType.COMPONENT
  | ControlType.DATE
  | ControlType.ARRAY
  | ControlType.CHECKBOX;

export type inputType = 'text' | 'password' | 'number';

export interface TextParams {
  label?: string;
  type?: inputType;
}

export interface GroupParams extends TextParams {
  fields: TemplateFormField<AnyControlType>[];
}

export interface SelectParams<T = any> extends TextParams {
  multiple?: boolean;
  required?: boolean;
  reset?: boolean;
  options: {
    data: T[] | Observable<T>;
    displayProp: keyof T;
    valueProp: keyof T;
  };
}

export interface DateParams extends TextParams {
  hint?: boolean;
}

export interface ComponentParams<T> {
  component: ComponentType<T>;
  inputs?: { [p: string]: any };
}

export interface ArrayParams extends TextParams {
  elements: TemplateFormFieldBuilder<ControlType.GROUP>[]; // TODO: change to accept AnyControlType
  visibleChangeButtons?: boolean;
}

export type Params<T extends ControlType> = T extends ControlType.TEXT
  ? TextParams
  : T extends ControlType.GROUP
  ? GroupParams
  : T extends ControlType.SELECT
  ? SelectParams
  : T extends ControlType.DATE
  ? DateParams
  : T extends ControlType.COMPONENT
  ? ComponentParams<any>
  : T extends ControlType.ARRAY
  ? ArrayParams
  : TextParams;

export type FieldVisible =
  | boolean
  | ((formGroup: FormGroup) => boolean | Observable<boolean>);

export interface TemplateFormField<T extends ControlType = ControlType.TEXT> {
  /**
   * @var name
   * this is field name/key for the form
   */
  name: string;
  value?: any;

  /**
   * @var params
   * can be different for every ControlType
   */
  params?: Params<T>;
  controlType: ControlType;
  validators?: ValidatorFn[];
  tip?: { message: string; position: TooltipPosition };
  readonly?: boolean;

  onChange?: (value: any, form: FormGroup) => void;
  visible?: FieldVisible;
}

/**
 * TemplateFormField without name field so structure can be used like this:
 *
 * @example
 * name: {
 *  params: ...
 * }
 */
export type TemplateFormFieldBuilder<T extends ControlType = ControlType.TEXT> =
  Omit<TemplateFormField<T>, 'name'>;

/**
 * Params where ControlType is strictly defined and cannot be overwritten
 */
export type TemplateFormFieldBuilderParams<
  T extends ControlType = ControlType.TEXT,
> = Omit<TemplateFormFieldBuilder<T>, 'controlType'>;

export type TemplateFormStructure<T extends { [k: string]: any }> = {
  [key in keyof Partial<T>]: TemplateFormFieldBuilder<AnyControlType>;
};

@Injectable({
  providedIn: 'root',
})
export class TemplateFormBuilder {
  public fields<T extends { [key: string]: any } = any>(
    structure: TemplateFormStructure<T>
  ): TemplateFormField<AnyControlType>[] {
    return this._toFormFields<T>(structure);
  }

  public group<T extends { [key: string]: any } = any>(
    structure: TemplateFormStructure<T>
  ): TemplateFormFieldBuilder<ControlType.GROUP> {
    return {
      controlType: ControlType.GROUP,
      visible: true,
      params: { fields: this._toFormFields<T>(structure) },
    };
  }

  public array(
    groups: [
      TemplateFormFieldBuilder<ControlType.GROUP>,
      ...TemplateFormFieldBuilder<ControlType.GROUP>[],
    ],
    visibleChangeButtons: boolean = false
  ): TemplateFormFieldBuilder<ControlType.ARRAY> {
    return {
      controlType: ControlType.ARRAY,
      visible: true,
      params: {
        elements: groups, // TODO: change TemplateFormBuilder to TemplateFormField
        visibleChangeButtons: visibleChangeButtons,
      },
    };
  }

  public text(
    params: TemplateFormFieldBuilderParams
  ): TemplateFormFieldBuilder {
    return { controlType: ControlType.TEXT, ...params };
  }

  public checkbox(
    params: TemplateFormFieldBuilderParams<ControlType.CHECKBOX>
  ): TemplateFormFieldBuilder<ControlType.CHECKBOX> {
    return { controlType: ControlType.CHECKBOX, ...params };
  }

  public select(
    params: TemplateFormFieldBuilderParams<ControlType.SELECT>
  ): TemplateFormFieldBuilder<ControlType.SELECT> {
    return { controlType: ControlType.SELECT, ...params };
  }

  public date(
    params: TemplateFormFieldBuilderParams<ControlType.DATE>
  ): TemplateFormFieldBuilder<ControlType.DATE> {
    return { controlType: ControlType.DATE, ...params };
  }

  public component(
    params: TemplateFormFieldBuilderParams<ControlType.COMPONENT>
  ): TemplateFormFieldBuilder<ControlType.COMPONENT> {
    return { controlType: ControlType.COMPONENT, ...params };
  }

  private _toFormFields<T extends { [key: string]: any }>(
    structure: TemplateFormStructure<T>
  ): TemplateFormField<AnyControlType>[] {
    return Object.entries(structure).map(([key, value]) => {
      return { name: key, ...value };
    });
  }
}
