# .config

A convention for project tools: look for configuration in `.config/` as well as
the project root. See <https://dot-config.joshka.net>.

This project continues
[dot-config/dot-config.github.io](https://github.com/dot-config/dot-config.github.io),
which is no longer maintained. Its history is kept here.

## Add a tool

Add an entry to [`src/data/tools.yaml`](src/data/tools.yaml):

```yaml
- name: "Example"
  description: "What the tool does"
  paths: [".config/example.toml"]
  reference: "https://example.com/docs/configuration"
  note: "Optional qualification, such as a minimum version."
```

Link to documentation or source that shows the tool finds `.config/` on its own.
Accepting an arbitrary path through a flag doesn't count.

## Develop

```sh
pnpm install
pnpm dev      # prints the local URL
pnpm build    # validates tools.yaml and writes dist/
```

CI runs `pnpm build` (which validates `tools.yaml`), [typos](https://github.com/crate-ci/typos),
[zizmor](https://docs.zizmor.sh/) and a lockfile check, all gated by one `required` job.
Actions are locked in `.github/workflows/actions.lock`: after changing a `uses:` line, run
`gh actions-lock` and commit both files.
