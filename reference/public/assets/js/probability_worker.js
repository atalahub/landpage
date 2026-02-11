self.onmessage = (e) => {
  if (e.data === 'check') {
    fetch("/assets/wasm/probability.wasm")
      .then((response) => response.arrayBuffer())
      .then((bytes) => WebAssembly.instantiate(bytes, {}))
      .then(({ instance }) => {
        // Seed per run (u32)
        if (instance.exports.seed) {
          instance.exports.seed(Date.now() >>> 0);
        }

        const result = instance.exports.check_probability();
        postMessage(Boolean(result));
      })
      .catch((err) => {
        console.error('Error loading WebAssembly:', err);
        postMessage(false);
      });
  }
};
