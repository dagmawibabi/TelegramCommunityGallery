import { o as onMount } from "./ssr2.js";
import "./exports.js";
import "@sveltejs/kit/internal/server";
const is_legacy = onMount.toString().includes("$$") || /function \w+\(\) \{\}/.test(onMount.toString());
const placeholder_url = "a:";
if (is_legacy) {
  ({
    data: {},
    form: null,
    error: null,
    params: {},
    route: { id: null },
    state: {},
    status: -1,
    url: new URL(placeholder_url)
  });
} else {
  new class Page {
    data = $state.raw({});
    form = $state.raw(null);
    error = $state.raw(null);
    params = $state.raw({});
    route = $state.raw({ id: null });
    state = $state.raw({});
    status = $state.raw(-1);
    url = $state.raw(new URL(placeholder_url));
  }();
  new class Navigating {
    current = $state.raw(null);
  }();
  new class Updated {
    current = $state.raw(false);
  }();
}
