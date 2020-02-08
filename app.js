const root = document.querySelector("#root");

const { Component } = React;
const { render } = ReactDOM;

const Nav = props => {
  let keys = Object.keys(props);
  let values = Object.values(props);
  // console.log(props);

  const compBut = React.createElement(
    "a",
    {
      href: `#${keys[0]}`,
      className: `${props.view === "companies" ? "active" : ""}`
    },
    `Companies (${values[0].length})`
  );
  console.log(props.view);
  const prodBut = React.createElement(
    "a",
    {
      href: `#${keys[1]}`,
      className: `${values[2] === "products" ? "active" : ""}`
    },
    `Products (${values[1].length})`
  );
  return React.createElement("div", null, compBut, prodBut);
};
const CompanyList = ({ companies }) => {
  const list = companies.map((comp, idx) => {
    return React.createElement(
      "li",
      { href: "/companies", key: idx },
      comp.name
    );
  });
  return React.createElement("ul", null, list);
};
const ProductList = ({ products }) => {
  const list = products.map((prod, idx) => {
    return React.createElement(
      "li",
      { href: "/products", key: idx },
      prod.name
    );
  });
  return React.createElement("ul", null, list);
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      companies: [],
      products: [],
      view: "companies"
    };
  }
  componentDidMount() {
    const view = window.location.hash.slice(1);
    this.setState({ view });
    const promiseComps = axios.get(
      "https://acme-users-api-rev.herokuapp.com/api/companies"
    );
    const promiseProds = axios.get(
      "https://acme-users-api-rev.herokuapp.com/api/products"
    );
    const p = Promise.all([promiseComps, promiseProds]).then(response => {
      this.setState({
        companies: response[0].data,
        products: response[1].data
      });
    });
    window.addEventListener("hashchange", () => {
      this.setState({
        view: window.location.hash.slice(1)
      });
    });
  }
  render() {
    const { companies, products, view } = this.state;
    const nav = React.createElement(Nav, { companies, products, view });
    let chosenView;
    if (view === "companies") {
      chosenView = React.createElement(CompanyList, { companies });
    }
    if (view === "products") {
      chosenView = React.createElement(ProductList, { products });
    }
    return React.createElement("div", null, nav, chosenView);
  }
}
render(React.createElement(App), root);

// <script>
//             const { Component } = React;
//             const { render } = ReactDOM;
//             const Header = ([addRandomNumber]) =>
//             {
//                 return React.createElement('button', {onClick: addRandomNumber()}, "Add New Number")
//             }
//             const List = ({data, removeNumber}) =>
//             {
//                 console.log(removeNumber)
//                 const lis = data.map( (item, idx) =>
//                 {
//                     return React.createElement('li', {key: idx, className: "item", onClick: () => removeNumber(idx)}, item);
//                 })
//                 return React.createElement('ul', null, lis);
//             }
//             class App extends Component
//             {
//                 constructor()
//                 {
//                     super();
//                     this.state =
//                     {
//                         data: []
//                     };
//                 }
//                 componentDidMount()
//                 {
//                     setTimeout( () =>
//                     {
//                         this.setState({ data: [1,2,2,5,7]});
//                     }, 500)
//                 }
//                 render()
//                 {
//                     const { data } = this.state;
//                     const addRandomNumber = () =>
//                     {
//                         this.setState({data: [...data,Math.random()]})
//                     };
//                     const removeNumber = (idx) =>
//                     {
//                         data.splice(idx, 1);
//                         this.setState({data});
//                     };
//                     const list = React.createElement(List, {data, removeNumber});
//                     const list2 = React.createElement(List, {data, removeNumber});
//                     const header = React.createElement(Header, {addRandomNumber});
//                     return React.createElement('div', null, header, list, list2);
//                 }
//             }
//             const root = document.querySelector('#root');
//             ReactDOM.render(React.createElement('hr'), root);
//         </script>
