// Minimal WebAssembly module source for the "probability" worker.
// Exports:
// - seed(u32): seeds an internal PRNG
// - check_probability() -> i32: returns 1 occasionally, otherwise 0
//
// Compile (from repo root):
// clang --target=wasm32 -O3 -nostdlib \
//   -Wl,--no-entry -Wl,--export=seed -Wl,--export=check_probability \
//   public/assets/wasm/probability.c -o public/assets/wasm/probability.wasm

typedef unsigned int uint32_t;

static uint32_t state = 1u;

__attribute__((export_name("seed")))
void seed(uint32_t s) {
  state = (s == 0u) ? 1u : s;
}

// Roughly ~1/32768 chance.
__attribute__((export_name("check_probability")))
int check_probability(void) {
  // LCG parameters (Numerical Recipes)
  state = state * 1664525u + 1013904223u;
  return ((state & 0x7FFFu) == 0u) ? 1 : 0;
}

