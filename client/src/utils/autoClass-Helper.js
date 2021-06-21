const autoClassHelper = (data) => {
  switch (data.componentType) {
    case "input":
      if (data.error && Array.isArray(data.error)) {
        const errorObj = data.error.find((err) => {
          if (err.param === data.type) {
            return err.param;
          } else {
            return {};
          }
        });

        if (errorObj.param === data.type) {
          return { class: "error", error: errorObj.error };
        }
      } else if (data.error && typeof data.error === "string") {
        let cls = "";
        let msg = "";
        if (data.error === "Invalid password" && data.type === "oldpassword") {
          cls = "error";
          msg = data.error;
        }

        return { class: cls, error: msg };
      } else {
        return { class: data.defaultClass };
      }
      return { class: data.defaultClass };
    default:
      return { class: data.defaultClass };
  }
};

export default autoClassHelper;
