use crate::atoms::tag::RgTag;
use crate::atoms::token::RgToken;
use crate::base::CustomElementCreator;

pub mod tag;
pub mod token;

pub(crate) fn define_elements() {
  RgTag::define_element();
  RgToken::define_element();
}
