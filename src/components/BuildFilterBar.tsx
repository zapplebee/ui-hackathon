import { useForm } from "react-hook-form";
import { Checkbox } from "./formInputs/Checkbox";
import { RadioButton } from "./formInputs/RadioButton";
import { useEffect } from "react";

export interface BuildFilterBarProps {
  onChange?: (values: BuildFilterBarChange) => void;
}

interface FormValues {
  event: string;
  timestamp: boolean;
}

export type BuildFilterBarChange = Partial<FormValues>;

export function BuildFilterBar({ onChange }: BuildFilterBarProps) {
  const { register, watch } = useForm<FormValues>({
    defaultValues: {
      event: "all",
      timestamp: false,
    },
  });

  useEffect(() => {
    const subscription = watch((value) => {
      if (onChange) {
        onChange(value);
      }
    });

    return () => subscription.unsubscribe();
  }, [onChange, watch]);

  return (
    <>
      <div className="flex justify-between bg-vela-coal-dark p-4 text-base">
        <div className="flex items-center gap-4">
          <div>Filter by event:</div>
          <RadioButton
            label="All"
            value="all"
            {...register("event")}
            aria-label="filter to show all events"
          />
          <RadioButton
            label="Push"
            value="push"
            {...register("event")}
            aria-label="filter to show push events"
          />
          <RadioButton
            label="Pull Request"
            value="pull_request"
            {...register("event")}
            aria-label="filter to show pull request events"
          />
          <RadioButton
            label="Tag"
            value="tag"
            {...register("event")}
            aria-label="filter to show tag events"
          />
          <RadioButton
            label="Comment"
            value="comment"
            {...register("event")}
            aria-label="filter to show comment events"
          />
          <RadioButton
            label="Deployment"
            value="deployment"
            {...register("event")}
            aria-label="filter to show deployment events"
          />
        </div>
        <div>
          <Checkbox {...register("timestamp")} label="Show full timestamps" />
        </div>
      </div>
    </>
  );
}
