import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
var axios = require('axios');
export class Home extends Component {  
    constructor(props){
        super(props)
        this.state = { search:'',response: []}
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
      }

      handleChange(event){
        this.setState({
          // Computed property names
          // keys of the objects are computed dynamically
          [event.target.name] : event.target.value
        })
      }
      componentDidMount(){
        this.getData();
        
      }
      getData(search=''){
        let headers= {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Access-Control-Allow-Origin': '*'
      };
        axios.get('https://api.jikan.moe/v4/characters?q='+search+'&order_by=favorites&sort=desc',{mode:'cors'},{headers}).then((resp) => {
          var respNew = resp.data;
          console.log("respNew==",respNew);
          if (resp.status === 200) {
            console.log("respNew==",respNew);
            this.setState({ tabledata: respNew.data, respStatus : true});
            console.log(this.state.tabledata)
            { this.showTableHtml() }

          }
        })
      }

      handleSubmit(event){
        const { search } = this.state
        event.preventDefault()
        this.getData(search)
        
      }
      showTableHtml = () => {
        if (this.state.respStatus === true) {
          var html = [];
          this.state.tabledata.map(async function (value, i) {
            html.push({
              mal_id:value.mal_id,
              name:value.name,
              name_kanji:value.name_kanji,
              nicknames:value.nicknames.toString(),
              favorites:value.favorites,
              jpg:value.images.jpg.image_url,
              webp:value.images.webp.small_image_url,
              about:value.about,
              url:value.url,
            })
          })
          this.setState({ listdata: html })
        }
    
      };
    render() {  
        return (  
            <div>
                <section id="hero" className="d-flex align-items-center">
                    <div className="container">
                      <div className='col-md-12'>
                    <form method="post" role="form" className="php-email-form" onSubmit={this.handleSubmit}>
                            <div className="row">
                                <div className="col-md-4 form-group">
                                    <input type="text" name="search" className="form-control" id="search" placeholder="Enter Your Text" value = {this.state.search} onChange={this.handleChange} />
                                    <div className="validate"></div>
                                </div>
                                <div className='col-md-4 form-group'>
                                  <div className="text-center"><button type="submit">search</button></div>
                                </div>
                            </div>                            
                        </form>
                        </div>
                    </div>
              <br />
          
                </section>
                <div className='col-md-12'>    
        <BootstrapTable
          data={this.state.listdata}
          striped={true}
          hover={true}
          pagination
          ignoreSinglePage
          onSizePerPageList={15}
         // search searchPlaceholder='Serach'
        >
                    <TableHeaderColumn dataField="mal_id" isKey={true}>
            ID
          </TableHeaderColumn>
          <TableHeaderColumn dataField="name" >
            Name
          </TableHeaderColumn>

          <TableHeaderColumn dataField="name_kanji" >
          Name Kanji
          </TableHeaderColumn>
          <TableHeaderColumn dataField="nicknames" >
          Nicknames
          </TableHeaderColumn>
          <TableHeaderColumn dataField="favorites" >
          Favorites
          </TableHeaderColumn>
          <TableHeaderColumn dataField="jpg" >
          Jpg Image
          </TableHeaderColumn>
          <TableHeaderColumn dataField="webp" >
          Webp Image
          </TableHeaderColumn>
          <TableHeaderColumn dataField="about" >
          About
          </TableHeaderColumn>
          <TableHeaderColumn dataField="url" >
          Url
          </TableHeaderColumn>
        </BootstrapTable>
        </div>
            </div>
        )  
    }  
}  
  
export default Home  