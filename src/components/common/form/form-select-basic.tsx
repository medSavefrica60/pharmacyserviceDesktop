import { FieldValues, useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { FormInputProps } from "@/components/common/form/types";

interface FormSelectBasicProps<T extends FieldValues>
  extends FormInputProps<T> {
  /**
   * Array of option objects to populate the select
   */
  options: Record<string, any>[];
  /**
   * Key in the option object to use as the value
   * @default "id"
   */
  idField?: string;
  /**
   * Key in the option object to use as the display text
   * @default "name"
   */
  dataField?: string;
  /**
   * Optional group label for the select options
   */
  groupLabel?: string;
  /**
   * Callback when value changes
   */
  onValueChange?: (value: string) => void;
}

export default function FormSelectBasic<T extends FieldValues>({
  options,
  idField = "id",
  dataField = "name",
  groupLabel,
  onValueChange,
  ...props
}: FormSelectBasicProps<T>) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      disabled={props.disabled}
      name={props.name}
      render={({ field }) => (
        <FormItem className={props.formItemClassname}>
          <FormLabel className="">{props.label}</FormLabel>
          <FormControl>
            <Select
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value);
                onValueChange?.(value);
              }}
              disabled={props.disabled}
            >
              <SelectTrigger className={cn("w-full h-10", props.className)}>
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {groupLabel && <SelectLabel>{groupLabel}</SelectLabel>}
                  {options.map((option) => {
                    const id = option[idField];
                    const displayText = option[dataField];
                    return (
                      <SelectItem key={id} value={String(id)}>
                        {displayText}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
