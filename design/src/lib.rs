use wasm_bindgen::prelude::wasm_bindgen;

pub mod atoms;
pub mod molecules;
pub mod organisms;

pub mod base;

#[wasm_bindgen(start)]
fn run() {
  atoms::define_elements();
}
