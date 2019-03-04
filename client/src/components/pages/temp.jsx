// import React, { Component } from "react";
// import { Container, Row, Col } from "reactstrap";
// import Petcard from "../Petcard";
// import { Link } from "react-router-dom";
// import UploadWidget from "../UploadWidget";

// // import '../styles.scss';

// export default class Profile extends Component {
// 	render() {
// 		return (
// 			<Container>
// 					<Row className="userprofile">
// 						<h1>About you</h1>
// 						<img
// 							src={this.props.image}
// 							alt="userpic"
// 							className="center"
// 						/>{" "}
// 						<br />
// 						Email:{this.props.email} <br />
// 						Address:{this.props.address} <br />

// 					</Row>
// 				</Container>

// 				<Row>
// 					<h1>Your lovely pet</h1>
// 					<Container className="petCardContainer">
// 						<Row>
// 							<Col>
// 								<Petcard />
// 							</Col>
// 							<Col>
// 								<Petcard />
// 							</Col>
// 							<Col>
// 								<Petcard />
// 							</Col>
// 						</Row>
// 					</Container>
// 					<Link to="/managePets" className="btn btn-primary">
// 						Manage your Pets
// 					</Link>
// 				</Row>

// 				<Row>
// 					<h1>The pets you have petted:</h1>
// 					<Petcard />
// 				</Row>
// 		);
// 	}
// }

// TAKE FROM MANAGEPETS COMPONENT
//   < Button className = "btn btn-success" >
//     <i className="fas fa-fish" />
//         </Button >
//   {
//     this.state.pets.map(pet => (
//       <div>
//         <p>{pet.name}</p>
//         <Button
//           className="btn btn-success"
//           onClick={() => this.editPet(pet)}
//         >
//           <i className="fas fa-pencil-alt" />
//         </Button>
//         <Button
//           className="btn btn-secondary"
//           onClick={() => this.deletePet(pet)}
//         >
//           <i className="fas fa-minus" />
//         </Button>
//       </div>
//     ))
//   }
//   < Button
// className = "btn btn-secondary"
//   // onClick={() => this.deletePet(pet)}
//   >
//   <i className="fas fa-plus" />
//         </Button >
//   <PetModal
//     modalOpen={this.state.modalOpen}
//     toggleModal={this.modalToggle}
//     pet={this.state.modalPet}
//   />
//   <ConfirmModal
//     confirmOpen={this.state.confirmOpen}
//     toggleModal={this.confirmationToggle}
//     pet={this.state.modalPet}
//     confirmDelete={this.confirmDelete}
//   />
