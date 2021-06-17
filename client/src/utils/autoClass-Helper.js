const autoClassHelper = (data) => {
  switch (data.componentType) {
    case "input":
      if (data.error && Array.isArray(data.error)) {
        let cls = ""
        let msg = ""
        data.error.find((err) => {
          if (err.param === data.type) {
            cls = "error"
            msg = err.msg
          }
        })
        return { class: cls, error: msg }
      } else if (data.error && typeof data.error === "string") {
        let cls = ""
        let msg = ""
        if (data.error === "Invalid password" && data.type === "oldpassword") {
          cls = "error"
          msg = data.error
        }
        return { class: cls, error: msg }
      }
    /* else if (data.error && typeof data.error === "string") {
        return { error: data.error, class: "error" }
      } else if (!data.error && data.class) {
        return { error: "", class: data.class }
      } else {
        console.log("AutoClassHelper: ERROR")
        return { class: "primary" }
      }
      console.log("AutoClassHelper: ERROR")
      return { class: "primary" } */
    default:
      return { class: data.defaultClass }
  }
}

export default autoClassHelper
