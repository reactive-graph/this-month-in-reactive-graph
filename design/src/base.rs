use rs_web_component::define_element;
use rs_web_component::Component;
use web_sys::HtmlElement;
use web_sys::ShadowRoot;

pub enum ThisVal {
  Value(HtmlElement),
  None,
}

pub enum RootVal {
  Value(ShadowRoot),
  None,
}

pub trait CustomElementCreator {
  fn tag_name() -> String;

  fn create_component() -> Box<dyn Component>;

  fn define_element() {
    define_element(Self::tag_name(), Self::create_component);
  }
}
