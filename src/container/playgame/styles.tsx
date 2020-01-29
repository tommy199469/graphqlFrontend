import CSS from 'csstype';

const divStyle: CSS.Properties<string | number> = {
  display: 'flex',
  flex: 1,
  marginTop : "25%",
  alignItems: 'center',
  justifyContent: 'center'
};


const btnDivStyle: CSS.Properties<string | number> = {
  padding : 50
};

export default {
  divStyle,
  btnDivStyle
}