package shared
package model

import io.circe.generic.JsonCodec

@JsonCodec case class Account(
  id: String,
  username: String,
  email: Option[String],
  publicKey: String
)
