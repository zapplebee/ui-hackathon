import ansiHTML from "ansi-html-community";
import { LogsLoadingIndicator } from "./LogsLoadingIndicator";
import { Ref, forwardRef, useImperativeHandle, useRef } from "react";

export interface LogsDisplayProps {
  id: string;
  logs: string[];
  number?: number;
  active: boolean;
  fetching: boolean;
}

export interface LogsDisplayMethods {
  topRef: React.RefObject<HTMLAnchorElement>;
  bottomRef: React.RefObject<HTMLAnchorElement>;
}

function _LogsDisplay(
  { id, number, logs, active, fetching }: LogsDisplayProps,
  forwardedRef: Ref<LogsDisplayMethods>,
) {
  const topRef = useRef<HTMLAnchorElement>(null);
  const bottomRef = useRef<HTMLAnchorElement>(null);

  useImperativeHandle(forwardedRef, () => ({
    topRef,
    bottomRef,
  }));

  return (
    <>
      <div className="__vela-scrollbar block max-h-[80vh] min-h-[10rem] resize-y overflow-y-auto pb-8 pt-4">
        <table className="w-full table-fixed">
          <thead className="hidden">
            <tr>
              <th>Line Number</th>
              <th>Line Content</th>
            </tr>
          </thead>
          <tbody className="w-full">
            <tr className="w-full opacity-0" data-step-top>
              <td>
                <a ref={topRef} id={`${id}-top`} tabIndex={-1}></a>
              </td>
            </tr>
            {logs.map((log, index) => {
              return (
                <tr
                  key={`${number}:${index}`}
                  id={`${number}:${index}`}
                  className="flex w-full items-start hover:bg-vela-coal"
                >
                  <td>
                    {/* why is this a button? well apparently you can highlight a range now in vela */}
                    {/* todo: make button add #step:line to the url */}
                    <button className="relative w-[6ch] select-none overflow-hidden text-ellipsis whitespace-nowrap text-right font-mono text-vela-cyan no-underline hover:underline">
                      <span>{index + 1}</span>
                    </button>
                  </td>
                  <td className="mr-4 w-full flex-1 overflow-auto pl-4">
                    <code>
                      <pre
                        className="whitespace-pre-wrap [word-break:break-word] [word-wrap:break-word]"
                        // this looks quite different than the elm version
                        // so we'll need to think about different options
                        // 😸 pre with css wrap works though
                        dangerouslySetInnerHTML={{
                          __html: ansiHTML(linkify(log)),
                        }}
                      />
                    </code>
                  </td>
                </tr>
              );
            })}
            <LogsLoadingIndicator active={active} fetching={fetching} />
            <tr className="w-full opacity-0" data-step-bottom>
              <td>
                <a
                  ref={bottomRef}
                  id={`${id}-bottom`}
                  tabIndex={-1}
                  href="#"
                ></a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export const LogsDisplay = forwardRef<LogsDisplayMethods, LogsDisplayProps>(
  _LogsDisplay,
);

/**
 * Linkify. A very basic regex based function to parse a string input with
 * raw http/https urls and convert them into html anchor tagged links.
 *
 * @todo
 * We would probably provide a configuration setting to turn this on or off.
 *
 * @param text
 * @returns text with anchor tagged link
 */
function linkify(text: string) {
  const regex = /((http|https):\/\/[^\s]+)/g;

  const replacedText = text.replace(regex, (url) => {
    return `<a target="_blank" rel="noopener noreferrer" href="${url}">${url}</a>`;
  });

  return replacedText;
}
