import Layout from "../components/layout"
import React from "react"
import Showcase from "../components/PageComponents/Showcase"
import Contact from "../components/PageComponents/Contact"
import Services from "../components/PageComponents/Services"
import Index from "../pages/index"
import About from "../components/PageComponents/About"
import Press from "../components/PageComponents/Press"

const Page = ({ pageContext: { title, slug, uri }, location }) => {
  const ComponentToRender = pageMapping[title] || PlaceholderComponent
  return (
    <Layout>
      <ComponentToRender name={title} />
    </Layout>
  )
}
const PlaceholderComponent = ({ name }) => {
  return <p>{`You need to make a component map for ${name}`}</p>
}

const pageMapping = {
  Home: Index,
  About,
  Showcase,
  Contact,
  Services,
  Press,
}

export default Page
