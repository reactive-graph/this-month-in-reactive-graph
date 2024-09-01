use rs_web_component::Component;
use wasm_bindgen::prelude::*;
use web_sys::HtmlElement;
use web_sys::ShadowRoot;
use web_sys::ShadowRootInit;
use web_sys::ShadowRootMode;

use crate::base::CustomElementCreator;
use crate::base::RootVal;
use crate::base::ThisVal;

pub struct RgToken {
  root: RootVal,
  this: ThisVal,
}

impl CustomElementCreator for RgToken {
  fn tag_name() -> String {
    "rg-token".to_string()
  }

  fn create_component() -> Box<dyn Component> {
    Box::new(Self {
      root: RootVal::None,
      this: ThisVal::None,
    })
  }
}

impl Component for RgToken {
  fn init(&mut self, this: HtmlElement) {
    self.this = ThisVal::Value(this);
  }

  fn observed_attributes(&self) -> Vec<String> {
    return vec!["ty".to_string()];
  }

  fn attribute_changed_callback(&self, _name: String, _old_value: JsValue, _new_value: JsValue) {}

  fn connected_callback(&mut self) {
    self.root = RootVal::Value(self.get_this().attach_shadow(&ShadowRootInit::new(ShadowRootMode::Open)).unwrap());
    self.rerender();
  }

  fn disconnected_callback(&self) {}
}

impl RgToken {
  fn render(&self) -> String {
    let ty = self.get_this().get_attribute("ty").unwrap_or(String::new());
    let text = self.get_this().inner_html();
    format!("<link rel=\"stylesheet\" href=\"/css/reactive-graph.css\"><span class=\"token rg-{ty}\">{text}</span>",).to_string()
  }

  fn rerender(&self) {
    self.get_root().set_inner_html(self.render().as_str());
  }

  fn get_root(&self) -> &ShadowRoot {
    return match &self.root {
      RootVal::Value(root) => &root,
      RootVal::None => panic!("not a root!"),
    };
  }

  fn get_this(&self) -> &HtmlElement {
    match &self.this {
      ThisVal::Value(val) => val,
      ThisVal::None => panic!("not an HtmlElement"),
    }
  }
}
