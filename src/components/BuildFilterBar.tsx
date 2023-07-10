import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useEventParam } from "../library/hooks/useEventParam";
import { RadioButton } from "./formInputs/RadioButton";
import { Checkbox } from "./formInputs/Checkbox";

export function BuildFilterBar() {
  const [eventFilter, setEventFilter] = useState<string>("all");

  const { event } = useEventParam();

  const navigate = useNavigate();

  useEffect(() => {
    if (event) {
      setEventFilter(event);
    } else {
      setEventFilter("all");
    }
  }, [event]);

  function handleEventFilter(e: React.ChangeEvent<HTMLInputElement>) {
    const event = e.currentTarget.value;

    if (event === "all") {
      navigate({ search: `` });
    } else {
      navigate({ search: `event=${event}` });
    }
  }

  return (
    <>
      <div className="flex items-center justify-between bg-vela-coal-dark p-4 text-base">
        <div className="flex flex-col flex-wrap justify-start gap-x-4 gap-y-4 md:flex-row md:items-center md:justify-normal md:gap-y-2">
          <div>Filter by event:</div>
          <RadioButton
            label="All"
            value="all"
            checked={eventFilter === "all"}
            name="build-filter-bar-event"
            onChange={handleEventFilter}
            aria-label="filter to show all events"
          />
          <RadioButton
            label="Push"
            value="push"
            checked={eventFilter === "push"}
            name="build-filter-bar-event"
            onChange={handleEventFilter}
            aria-label="filter to show push events"
          />
          <RadioButton
            label="Pull Request"
            value="pull_request"
            checked={eventFilter === "pull_request"}
            name="build-filter-bar-event"
            onChange={handleEventFilter}
            aria-label="filter to show pull request events"
          />
          <RadioButton
            label="Tag"
            value="tag"
            checked={eventFilter === "tag"}
            name="build-filter-bar-event"
            onChange={handleEventFilter}
            aria-label="filter to show tag events"
          />
          <RadioButton
            label="Comment"
            value="comment"
            checked={eventFilter === "comment"}
            name="build-filter-bar-event"
            onChange={handleEventFilter}
            // {...register("event")}
            aria-label="filter to show comment events"
          />
          <RadioButton
            label="Deployment"
            value="deployment"
            checked={eventFilter === "deployment"}
            name="build-filter-bar-event"
            onChange={handleEventFilter}
            aria-label="filter to show deployment events"
          />
        </div>

        <div>
          <Checkbox label="Show full timestamps" />
        </div>
      </div>
    </>
  );
}
