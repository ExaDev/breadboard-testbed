#!/usr#!/usr/bin/env npx -y tsx
import { Board, Probe } from "@google-labs/breadboard";

const board: Board = new Board();

board.input().wire("*", board.output());

// noinspection JSUnusedGlobalSymbols,JSUnusedLocalSymbols
class LogProbe implements Probe {
	addEventListener(type: string, callback: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void {
	}

	dispatchEvent(event: Event): boolean {
		console.debug(event);
		return event.bubbles;
	}

	removeEventListener(type: string, callback: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void {
	}
}

(async () => {
	for await (const step of board.run({
		probe: new LogProbe(),
	})) {
		console.log("=".repeat(80));
		if (step.type === "input") {
			const inputs = {
				message: new Date().toISOString(),
			};
			step.inputs = inputs;
			console.log({
				node: step.node,
				inputs,
			});
		} else if (step.type === "output") {
			console.log({
				node: step.node,
				outputs: step.outputs
			});
		}
	}
	console.log("=".repeat(80));
})();
