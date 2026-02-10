await import("@happy-dom/global-registrator")
  .then(({ GlobalRegistrator }) => {
    GlobalRegistrator.register();
  })
  .catch(() => {
    // Fall back to Bun's --dom environment when Happy DOM is unavailable.
  });
