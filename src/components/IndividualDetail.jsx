import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import productList from '../services/productList';
import packageList from '../services/packageList';
import userchar from '../images/user.svg';
import logo from '../images/logo.svg';
import { useParams } from 'react-router-dom';

const shopstore = JSON.parse(localStorage.getItem('purchaseFineshed'));
const extraInfo = JSON.parse(localStorage.getItem('extraPurchaseData'));

class IndividualDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: ''
    };
  }

  componentDidMount() {
    const { id } = useParams();
    this.setState({ id });
  }

  renderPerfilHeader() {
    return (
      <div className="products-page-nav">
        <Link to="/mainPurchase"><img src={logo} alt="" width="100px" /></Link>
      </div>
    );
  }

  renderListOfProducts(arr) {
    
  }

  renderIndividualPurchase() {
    const { id } = this.state;
    const objWanted = shopstore.filter((elem) => elem.id_compra === id);
    const somaProdutos = objWanted.cart.reduce((acc, elem) => {
        return acc + (productList[elem.id].originalPrice * elem.total);
    }, []);
    const discount = objWanted.pack.reduce((acc, elem) => {
      const mult = (elem.total === '') ? 0 : elem.total;
      return acc + (packageList[(elem.id - 1)].price * mult);
    }, []);
    const total = somaProdutos - discount;
    const ObjExtra = extraInfo.filter((elem) => elem.id === id);
  return (
      <div>
        <p>Ola {ObjExtra.nome}</p>
        <p>A compra foi realizada no dia {ObjExtra.day}</p>
        {this.renderListOfProducts(objWanted.cart)}
        {this.renderReturnedRecipient()}
        <p>Valor total foi de {total}</p>
        <p>A compra foi {(objWanted.collection.isDelivery)
          ? 'entregue via Delivery'
          : 'Retirada em loja'}
        </p>
        {objWanted.collection.isDelivery && this.renderDeliveryAdress(ObjExtra)}
        <Link to={`/Detalhes/${Final.id}`}>detalhes</Link>
      </div>
    );
  }

  bla() {
    const {
      
    } = this.state;
    let arrInvidualResume = []
    if (purchase.length > 4) {
      arrInvidualResume = purchase.reduce((arr, elem, index) => {
        if(index > (purchase.length - 5)) {
          return [...arr, elem.id_compra];
        }
        return arr;
      },[]);
    } else {
      arrInvidualResume = purchase;
    }
    return (
      <div>
        {/* <img src={} alt="arrow" /> */}
        <h2>{(individualClicked) ? '⌄' : '›'}</h2>
        <h2 onClick={() => this.setState({ individualClicked: !individualClicked })}>Meus Pedidos</h2>
        {individualClicked && <ResumeCard purchaseList={arrInvidualResume} />}
{/* 
        {individualClicked && purchase.map((e, i) => (
          <div>
            <h2 onClick={() => { this.setState((state) => ({ obj: { ...state.obj, [e]: !state.obj[e] } })); }}>{`Compra ${i + 1}`}</h2>
            {
              obj[e] && (
                <div>
                  {shopstore.filter((el) => el.id_compra === e)[0].cart.map((ell) => {
                    const products = (productList.filter((elll) => elll.id === ell.id)[0]);
                    return (
                      <div className="make-flex">
                        <p>{`${products.productName} ${products.package_volume}L`}</p>

                        <p>{`x ${ell.total}`}</p>
                      </div>
                    );
                  })}
                </div>
              )
            }
          </div>
        ))}
        {} */}
      </div>
    );
  }

  renderPerfilFooter() {
    return (
      <div className="footer">
        <div />
        <Link to="/Perfil"><img src={userchar} alt="" width="30px" /></Link>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderPerfilHeader()}
        <div className="sub-container">
          <h4>{`Olá ${name}`}</h4>
          {this.renderIndividualPurchase()}
        </div>
        {this.renderPerfilFooter()}
      </div>
    );
  }
}

export default Perfil;
