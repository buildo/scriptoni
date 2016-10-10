new morpheus.Config {
  import morpheus.intermediate._

  val routeMatcherToIntermediate = PartialFunction.empty[(String, Option[Type]), Type]

  override val authRouteTermNames = List("withRole")
}
