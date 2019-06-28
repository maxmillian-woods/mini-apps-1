class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      render: "F1",
      name: "",
      email: "",
      password: "",
      shipping: "",
      phone: "",
      cc: "",
      ed: "",
      cvv: "",
      billing: ""
    };
  }
  ajaxrequest() {
    fetch("");
  }

  nextForm(formName, event) {
    event.preventDefault();
    this.setState({ render: formName });
    if (this.state.render === "F1") {
      var name = document.getElementsByName("firstname");
      var email = document.getElementsByName("email");
      var shippingAddress = document.getElementsByName("password");
      this.setState({ name: name[0].value });
      this.setState({ email: email[0].value });
      this.setState({ password: shippingAddress[0].value });
    } else if (this.state.render === "F2") {
      var shipping = document.getElementsByName("shipping");
      var phone = document.getElementsByName("phone");
      this.setState({ shipping: shipping[0].value });
      this.setState({ phone: phone[0].value });
    }
  }

  thirdForm(event) {
    event.preventDefault();
    this.setState({ render: "" });
    if (this.state.render === "F3") {
      var cc = document.getElementsByName("cc");
      var ed = document.getElementsByName("ed");
      var cvv = document.getElementsByName("cvv");
      var billing = document.getElementsByName("billing");
      this.setState({ cc: cc[0].value });
      this.setState({ ed: ed[0].value });
      this.setState({ cvv: cvv[0].value });
      this.setState({ billing: billing[0].value });
    }
    var message = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      shipping: this.state.shipping,
      phone: this.state.phone,
      cc: this.state.cc,
      ed: this.state.ed,
      cvv: this.state.cvv,
      billing: this.state.billing
    };
    $.ajax({
      type: "POST",
      url: "http://localhost:3000/",
      contentType: "application/json",
      data: JSON.stringify(message)
    })
      .done(function(data) {
        console.log(data);
      })
      .fail(function() {
        console.log("failed to post");
      });
  }

  render() {
    const form = this.state.render;
    let displayForm;
    if (form === "F1") {
      displayForm = <F1 onClick={this.nextForm.bind(this, "F2")} />;
    } else if (form === "F2") {
      displayForm = <F2 onClick={this.nextForm.bind(this, "F3")} />;
    } else if (form === "F3") {
      displayForm = <F3 onClick={this.thirdForm.bind(this)} />;
    } else {
      displayForm = <Submit>{this.state}</Submit>;
    }
    return <div>{displayForm}</div>;
  }
}

var F1 = props => (
  <form id="F1">
    Name:
    <br />
    <input type="text" name="firstname" />
    <br />
    Email:
    <br />
    <input type="text" name="email" />
    <br />
    Password:
    <br />
    <input type="password" name="password" />
    <br />
    <input type="submit" value="Submit" onClick={props.onClick} />
    <br />
  </form>
);

var F2 = props => (
  <form>
    Shipping Address: <br />
    <input type="text" name="shipping" /> <br />
    Phone Number:
    <br />
    <input type="text" name="phone" />
    <br />
    <input type="submit" value="Submit" onClick={props.onClick} />
    <br />
  </form>
);

var F3 = props => (
  <form>
    Credit Card #:
    <br />
    <input type="text" name="cc" />
    <br />
    Expiration Date:
    <br />
    <input type="text" name="ed" />
    <br />
    CVV:
    <br />
    <input type="text" name="cvv" />
    <br />
    Billing Zip Code:
    <br />
    <input type="text" name="billing" />
    <br />
    <input type="submit" value="Submit" onClick={props.onClick} />
    <br />
    <br />
  </form>
);

var Submit = props => {
  return <div>Thank You!</div>;
};

window.App = App;
