(this["webpackJsonpcompanies-web"]=this["webpackJsonpcompanies-web"]||[]).push([[0],{22:function(e,t,n){e.exports=n(39)},27:function(e,t,n){},33:function(e,t,n){},34:function(e,t,n){},35:function(e,t,n){},36:function(e,t,n){},37:function(e,t,n){},38:function(e,t,n){},39:function(e,t,n){"use strict";n.r(t);var a=n(0),s=n.n(a),r=n(20),i=n.n(r),o=n(1),c=n(13),l=n(6),m=n(7),p=n(11),u=n(9),d=n(8),h=(n(27),function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(l.a)(this,n),(a=t.call(this,e)).handlerUserInput=function(e){a.setState(Object(c.a)({},e.target.name,e.target.value))},a.handlerPasswordState=function(e){e.preventDefault(),!0===a.state.isPasswordHidden?a.setState({isPasswordHidden:!1}):a.setState({isPasswordHidden:!0})},a.handlerLogin=function(){a.setState({isLoading:!0}),a.postLogin(a.state).then((function(e){200===e.status?(sessionStorage.setItem("access-token",e.headers.get("access-token")),sessionStorage.setItem("client",e.headers.get("client")),sessionStorage.setItem("uid",e.headers.get("uid")),sessionStorage.setItem("isLoggedIn",!0),a.setState({isUserLoggedIn:!0})):a.setState({isLoginError:!0})}))},a.postLogin=function(e){return new Promise((function(t,n){var s=new Headers;s.append("Content-Type","application/json");var r=JSON.stringify({email:"".concat(e.email),password:"".concat(e.password)});fetch("https://empresas.ioasys.com.br/api/v1/users/auth/sign_in",{method:"POST",headers:s,body:r,redirect:"follow"}).then((function(e){a.setState({isLoading:!1}),t(e)})).catch((function(e){a.setState({isLoading:!1}),n(e)}))}))},a.state={email:"",password:"",isLoading:!1,isPasswordHidden:!0,isUserLoggedIn:!1,isLoginError:!1},a.handlerLogin=a.handlerLogin.bind(Object(p.a)(a)),a.handlerUserInput=a.handlerUserInput.bind(Object(p.a)(a)),a}return Object(m.a)(n,[{key:"componentDidMount",value:function(){sessionStorage.getItem("isLoggedIn")||sessionStorage.clear()}},{key:"render",value:function(){if(sessionStorage.getItem("isLoggedIn"))return s.a.createElement(o.a,{to:"/home"});var e=this.state.isLoading;return s.a.createElement("div",{className:"sign-in"},s.a.createElement("form",{className:e?"sign-in__form --blured":"sign-in__form"},s.a.createElement("div",{className:"sign-in__logo"}),s.a.createElement("div",{className:"sign-in__description-container"},s.a.createElement("div",{className:"sign-in__description"},s.a.createElement("div",{className:"sign-in__description-title"},s.a.createElement("p",null,"BEM-VINDO AO EMPRESAS")),s.a.createElement("div",{className:"sign-in__description-text"},s.a.createElement("p",null,"Lorem ipsum dolor sit amet, contetur adipiscing elit. Nunc accumsan.")))),s.a.createElement("div",{className:"sign-in__input-container"},s.a.createElement("div",{className:"sign-in__input",style:{borderBottom:this.state.isLoginError?".01vh solid #ff0f44":""}},s.a.createElement("label",{className:"sign-in__input-label --email",htmlFor:"email"}),s.a.createElement("input",{className:"sign-in__input-email",name:"email",type:"text",placeholder:"E-mail",autoComplete:"off",onChange:this.handlerUserInput}),s.a.createElement("div",{className:this.state.isLoginError?"sign-in__input-status":"sign-in__input-status --invisible"},"!"))),s.a.createElement("div",{className:"sign-in__input-container"},s.a.createElement("div",{className:"sign-in__input",style:{borderBottom:this.state.isLoginError?".01vh solid #ff0f44":""}},s.a.createElement("label",{className:"sign-in__input-label --password",htmlFor:"password"}),s.a.createElement("input",{className:"sign-in__input-password",name:"password",type:this.state.isPasswordHidden?"password":"text",placeholder:"Password",autoComplete:"off",onChange:this.handlerUserInput}),s.a.createElement("button",{className:this.state.isLoginError?"--hidden":"sign-in__input-reveal",onClick:this.handlerPasswordState}),s.a.createElement("div",{className:this.state.isLoginError?"sign-in__input-status":"--hidden"},"!"))),s.a.createElement("div",{className:this.state.isLoginError?"sign-in__input-feedback":"sign-in__input-feedback --invisible"},s.a.createElement("p",null,"Credenciais informadas s\xe3o inv\xe1lidas, tente novamente.")),s.a.createElement("input",{className:"sign-in__button",type:"button",value:"ENTRAR",onClick:this.handlerLogin})),e?s.a.createElement("div",{className:"sign-in__loader"},s.a.createElement("div",{className:"sign-in__loader-spinner"})):"")}}]),n}(a.Component));function g(e){return new Promise((function(t,n){var a=new Headers;a.append("Content-Type","application/json"),a.append("access-token","".concat(sessionStorage.getItem("access-token"))),a.append("client","".concat(sessionStorage.getItem("client"))),a.append("uid","".concat(sessionStorage.getItem("uid")));var s={method:"GET",headers:a,redirect:"follow"};""!==e.nomeEmpresa&&null===e.tipoEmpresa?fetch("https://empresas.ioasys.com.br/api/v1/enterprises?name=".concat(e.nomeEmpresa),s).then((function(e){t(e.json())})).catch((function(e){n(e)})):""===e.nomeEmpresa&&null!==e.tipoEmpresa?fetch("https://empresas.ioasys.com.br/api/v1/enterprises?enterprise_types=".concat(e.tipoEmpresa),s).then((function(e){t(e.json())})).catch((function(e){n(e)})):""!==e.nomeEmpresa&&null!==e.tipoEmpresa&&fetch("https://empresas.ioasys.com.br/api/v1/enterprises?enterprise_types=".concat(e.tipoEmpresa,"&name=").concat(e.nomeEmpresa),s).then((function(e){t(e.json())})).catch((function(e){n(e)}))}))}n(33);var E=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(l.a)(this,n),(a=t.call(this,e)).enterpriseTypeData=[],a.setButtonState=function(e){e.preventDefault(),!1===a.state[e.target.name]?(a.setState(Object(c.a)({},e.target.name,!0)),sessionStorage.setItem("enterpriseTypeValue",e.target.value)):(a.setState(Object(c.a)({},e.target.name,!1)),sessionStorage.removeItem("enterpriseTypeValue"))},a.getEnterpriseTypes=function(){for(var e=1;e<25;e++)g({nomeEmpresa:"",tipoEmpresa:e}).then((function(e){a.sortEnterpriseTypes(e)}))},a.sortEnterpriseTypes=function(e){var t=e.enterprises[0].enterprise_type.id,n=e.enterprises[0].enterprise_type.enterprise_type_name;a.enterpriseTypeData[t]=n,a.setState(Object(c.a)({enterpriseTypes:a.enterpriseTypeData},"button".concat(t),!1))},a.state={enterpriseTypes:[]},a}return Object(m.a)(n,[{key:"componentDidMount",value:function(){this.getEnterpriseTypes()}},{key:"render",value:function(){var e=this;return s.a.createElement("ul",{className:"carousel"},this.state.enterpriseTypes.map((function(t,n){return s.a.createElement("button",{className:e.state["button".concat(n)]?"carousel__button --active":"carousel__button",name:"button".concat(n),type:"button",value:n,key:n,onClick:e.setButtonState},t)})))}}]),n}(a.Component),f=n(10),v=(n(34),function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(){var e;Object(l.a)(this,n);for(var a=arguments.length,s=new Array(a),r=0;r<a;r++)s[r]=arguments[r];return(e=t.call.apply(t,[this].concat(s))).responseData=[],e.buttonHandler=function(e){var t=e;sessionStorage.setItem("selectedEnterpriseIndex",t)},e}return Object(m.a)(n,[{key:"render",value:function(){var e=this;return!0===this.props.isSearched?(this.responseData=this.props.responseData.enterprises,this.responseData.length>0?s.a.createElement("ul",{className:"enterprises"},this.responseData.map((function(t,n){return s.a.createElement(f.b,{className:"enterprise__button",key:n,onClick:function(){return e.buttonHandler(t.id)},to:"/empresa/".concat(t.id)},s.a.createElement("div",{className:"enterprise__button-logo"},t.id),s.a.createElement("div",{className:"enterprise__button-info"},s.a.createElement("p",{className:"enterprise__button-name"},t.enterprise_name),s.a.createElement("p",{className:"enterprise__button-type"},t.enterprise_type.enterprise_type_name),s.a.createElement("p",{className:"enterprise__button-country"},t.city)))}))):s.a.createElement("div",{className:"search"},s.a.createElement("p",{className:"search__notfound"},"Nenhuma empresa foi encontrada para a busca realizada."))):s.a.createElement("div",{className:"search"},s.a.createElement("p",{className:"search__start"},"Clique na busca para iniciar."))}}]),n}(a.Component)),_=(n(35),function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(l.a)(this,n),(a=t.call(this,e)).nomeEmpresa="",a.pesquisa={nomeEmpresa:"",tipoEmpresa:null},a.handleUserKeyDown=function(e){"Enter"===e.key&&a.handlerFilter(e)},a.handlerUserInput=function(e){a.nomeEmpresa=e.target.value},a.handlerFilter=function(e){a.pesquisa={nomeEmpresa:a.nomeEmpresa,tipoEmpresa:sessionStorage.getItem("enterpriseTypeValue")},"search"===e.target.value?(e.preventDefault(),a.setState({isInputMode:!0}),g(a.pesquisa).then((function(e){a.setState({responseData:e,isSearched:!0})})),""!==a.state.nomeEmpresa&&sessionStorage.setItem("enterpriseName",a.state.nomeEmpresa)):"close"===e.target.value&&(e.preventDefault(),a.setState({isInputMode:!1}))},a.state={responseData:{},nomeEmpresa:"",isInputMode:!1,isSearched:!1},a.handlerFilter=a.handlerFilter.bind(Object(p.a)(a)),a}return Object(m.a)(n,[{key:"componentDidMount",value:function(){sessionStorage.removeItem("enterpriseName"),sessionStorage.removeItem("enterpriseTypeValue"),sessionStorage.removeItem("selectedEnterpriseIndex")}},{key:"render",value:function(){if(!sessionStorage.getItem("isLoggedIn"))return s.a.createElement(o.a,{to:"/login"});var e=this.state.isInputMode;return s.a.createElement("div",{className:"home"},s.a.createElement("div",{className:"navbar"},s.a.createElement("div",{className:e?"navbar__input --input-mode":"navbar__input"},s.a.createElement("div",{className:e?"--hidden":"navbar__logo"}),s.a.createElement("button",{className:"filter__button --search ",value:"search",onClick:this.handlerFilter}),s.a.createElement("input",{className:e?"filter__search":"--hidden",name:"nomeEmpresa",type:"text",placeholder:"Pesquisar",spellCheck:"false",onKeyDown:this.handleUserKeyDown,onChange:this.handlerUserInput}),s.a.createElement("button",{className:e?"filter__button --close ":"--hidden",value:"close",onClick:this.handlerFilter}))),s.a.createElement(E,null),s.a.createElement(v,{responseData:this.state.responseData,isSearched:this.state.isSearched}))}}]),n}(a.Component));n(36);var b=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(l.a)(this,n),(a=t.call(this,e)).gerEnterpriseInfo=function(){var e,t=sessionStorage.getItem("selectedEnterpriseIndex");(e=t,new Promise((function(t,n){var a=new Headers;a.append("Content-Type","application/json"),a.append("access-token","".concat(sessionStorage.getItem("access-token"))),a.append("client","".concat(sessionStorage.getItem("client"))),a.append("uid","".concat(sessionStorage.getItem("uid")));var s={method:"GET",headers:a,redirect:"follow"};fetch("https://empresas.ioasys.com.br/api/v1/enterprises/".concat(e),s).then((function(e){t(e.json())})).catch((function(e){n(e)}))}))).then((function(e){a.setState({enterprise:e.enterprise})}))},a.state={enterprise:{}},a}return Object(m.a)(n,[{key:"componentDidMount",value:function(){sessionStorage.getItem("isLoggedIn")&&this.gerEnterpriseInfo()}},{key:"render",value:function(){if(!sessionStorage.getItem("isLoggedIn"))return s.a.createElement(o.a,{to:"/login"});var e=this.state.enterprise;return s.a.createElement("div",{className:"result"},s.a.createElement("div",{className:"result__navbar"},s.a.createElement(f.b,{className:"result__backtrack",to:"/home"}),s.a.createElement("div",{className:"result__enterprise-name"},e.enterprise_name)),s.a.createElement("div",{className:"result__description"},s.a.createElement("div",{className:"result__description-thumbnail"},s.a.createElement("span",null,e.enterprise_name)),s.a.createElement("div",{className:"result__description-text"},s.a.createElement("p",null,e.description))))}}]),n}(a.Component);n(37);var y=function(){return s.a.createElement("main",null,s.a.createElement(o.d,null,s.a.createElement(o.b,{exact:!0,path:"/",component:h}),s.a.createElement(o.b,{exact:!0,path:"/login",component:h}),s.a.createElement(o.b,{exact:!0,path:"/home",component:_}),s.a.createElement(o.b,{path:"/empresa/:empresaId",component:b})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n(38);i.a.render(s.a.createElement(f.a,null,s.a.createElement(y,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[22,1,2]]]);
//# sourceMappingURL=main.c40391b5.chunk.js.map