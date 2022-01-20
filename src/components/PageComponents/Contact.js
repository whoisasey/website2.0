import React, { useState, Fragment } from "react"
import { navigate, graphql, useStaticQuery } from "gatsby"
import gql from "graphql-tag"
// import { Mutation } from "react-apollo"
import Layout from "../layout"
import { v4 as uuidv4 } from "uuid"
import BlockRenderer from "../Blocks/BlockRenderer"

// let uuid = uuidv4()

// const CONTACT_MUTATION = gql`
//   mutation CreateSubmissionMutation(
//     $clientMutationId: String!
//     $firstName: String!
//     $lastName: String!
//     $email: String!
//     $subject: String!
//     $message: String!
//   ) {
//     createSubmission(
//       input: {
//         clientMutationId: $clientMutationId
//         firstName: $firstName
//         lastName: $lastName
//         email: $email
//         subject: $subject
//         message: $message
//       }
//     ) {
//       success
//       data
//     }
//   }
// `

const Contact = () => {
  const [firstNameValue, setFirstNameValue] = useState("")
  const [lastNameValue, setLastNameValue] = useState("")
  const [emailValue, setEmailValue] = useState("")
  const [subjectValue, setSubjectValue] = useState("")
  const [messageValue, setMessageValue] = useState("")

  const {
    wpPage: { blocks },
  } = useStaticQuery(query)
  // console.log(blocks)
  return (
    <Layout>
      <div className="form_container">
        <div className="left">
          <h1>Contact Us</h1>

          <p>
            Further case studies available upon request. Please provide some
            information on your project or goals and we’ll move the conversation
            on from there.
          </p>

          <hr />
          <p>Toronto, Canada </p>
          <a
            href="mailto:info@bigbuilds.ca"
            target="_blank"
            rel="noopener noreferrer"
          >
            info@bigbuilds.ca
          </a>
        </div>
        {/* <Mutation mutation={CONTACT_MUTATION}>
          {(createSubmission, { loading, error, data }) => (
            <Fragment>
              <div className="form">
                <form
                  onSubmit={async event => {
                    event.preventDefault()
                    createSubmission({
                      variables: {
                        clientMutationId: `${uuid}`,
                        firstName: firstNameValue,
                        lastName: lastNameValue,
                        email: emailValue,
                        subject: subjectValue,
                        message: messageValue,
                      },
                    })
                  }}
                >
                  <div>
                    <p>Name *</p>
                    <div className="field_name">
                      <div className="field_input">
                        <label htmlFor="firstNameInput">First Name</label>
                        <input
                          id="firstNameInput"
                          value={firstNameValue}
                          onChange={event => {
                            setFirstNameValue(event.target.value)
                          }}
                        />
                      </div>
                      <div className="field_input">
                        <label htmlFor="lastNameInput"> Last Name </label>
                        <input
                          id="lastNameInput"
                          value={lastNameValue}
                          onChange={event => {
                            setLastNameValue(event.target.value)
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="field_input">
                    <label htmlFor="emailInput">Email * </label>
                    <input
                      type="email"
                      id="emailInput"
                      value={emailValue}
                      onChange={event => {
                        setEmailValue(event.target.value)
                      }}
                    />
                  </div>

                  <div className="field_input">
                    <label htmlFor="subjectInput">Subject *</label>
                    <input
                      id="subjectInput"
                      value={subjectValue}
                      onChange={event => {
                        setSubjectValue(event.target.value)
                      }}
                    />
                  </div>

                  <div className="field_input">
                    <label htmlFor="messageInput">Message * </label>
                    <textarea
                      id="messageInput"
                      value={messageValue}
                      onChange={event => {
                        setMessageValue(event.target.value)
                      }}
                    ></textarea>
                  </div>
                  <button type="submit">Submit</button>
                </form>
                <div>
                  {loading && <p>Loading...</p>}
                  {error && (
                    <p>
                      An unknown error has occured, please try again later...
                    </p>
                  )}
                  {
                    data && navigate("/thank-you/")
                    // <p>Thank you! We will get back to you shortly</p>
                  }
                </div>
              </div>
            </Fragment>
          )}
        </Mutation> */}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query specialProjectsQuery {
    wpPage(slug: { eq: "contact" }) {
      blocks {
        name
        ... on WpCoreParagraphBlock {
          attributes {
            ... on WpCoreParagraphBlockAttributes {
              content
            }
          }
        }
      }
    }
  }
`

// import React from "react"

// const Contact = () => {
//   return <h1>contact</h1>
// }

export default Contact
