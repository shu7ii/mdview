import { h, render } from 'preact';
import { useState, useCallback } from 'preact/hooks';

import { md2html } from '../lib/markdown.worker';

const App = (): h.JSX.Element => {
  const [input, setInput] = useState('');
  const [converted, setConverted] = useState('');

  const updateInputValue: h.JSX.GenericEventHandler<HTMLTextAreaElement> = useCallback(
    e => {
      const { value: v } = e.currentTarget;
      setInput(v);
      md2html(v).then(setConverted);
    },
    []
  );

  return (
    <div class="app">
      <div class="c-col-2">
        <div class="c-col-2__col">
          <h2 class="c-heading -lv2">Input</h2>

          <textarea
            name="input"
            cols={30}
            rows={10}
            class="p-input-area"
            value={input}
            onInput={updateInputValue}
          ></textarea>
        </div>

        <div class="c-col-2__col">
          <div class="p-col-push">
            <div class="p-col-push__el">
              <h2 class="c-heading -lv2">Output</h2>
            </div>

            <div class="p-col-push__el -push">
              <div class="p-output-area u-full-height">
                <div
                  class="content"
                  dangerouslySetInnerHTML={{ __html: converted }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

render(<App />, document.body);
