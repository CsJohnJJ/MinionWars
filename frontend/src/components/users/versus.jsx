import React from "react";
import { fetchMinions } from '../../actions/minion_actions';
import { connect } from 'react-redux';
import { updateUser } from "../../actions/user_actions";

import './versus.css';

const mapStateToProps = (state) => {
  return {
    minions: state.entities.minions,
    users: state.entities.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchMinions: () => dispatch(fetchMinions()),
    updateUser: (userData) => dispatch(updateUser(userData))
  };
};

class Versus extends React.Component {
  constructor(props){
    super(props);
    this.currentUser = null;
    this.enemy = null;
    this.minion1 = null;
    this.minion2 = null;
    this.result = "";
    this.user = null;
    this.victoryNotice = "";
    this.attacked = false;
    this.attack = this.attack.bind(this);
  }

  componentDidMount() {
    this.props.fetchMinions();
  }

  attack(minion1, minion2){
    this.attacked = true;
    if (!minion1){
      this.result = this.currentUser.username + " go buy a minion!"
      return;
    }
    if (!minion2){
      this.result = this.currentUser.username + " wins by default"
      this.victoryNotice = "You have earned 100 coins for this victory!";
      this.currentUser.coins += 100;
      this.props.updateUser(this.currentUser);
      return;
    }
    let dmg;
    while (minion1.hp > 0 && minion2.hp > 0){
      dmg = minion1.attack - minion2.defense;
      minion2.hp -= dmg;
      this.result += `${minion1.name} deals ${dmg} to ${minion2.name}, hp left: ${minion2.hp}\n`;
      if (minion2.hp <= 0){
        this.result += this.currentUser.username + "'s " + minion1.name + " wins";
        this.victoryNotice = "You have earned 100 coins for this victory!";
        this.currentUser.coins += 100;
        this.props.updateUser(this.currentUser);
        break
      }
      dmg = minion2.attack - minion1.defense
      minion1.hp -= dmg;
      this.result += `${minion2.name} deals ${dmg} to ${minion1.name}, hp left: ${minion1.hp}\n`;
      if (minion1.hp <= 0) {
        this.result += this.enemy.username + "'s " + minion2.name + " wins";
        break
      }
    }
  }

  render() {
    if (this.props.history.location.state && !this.attacked){
      this.currentUser = this.props.history.location.state.currentUser; 
      this.enemy = this.props.history.location.state.enemy;
      let minions = Object.values(this.props.minions.data);

      if (minions) {
        for (let i = 0; i < minions.length; i++) {
          if (this.minion1 && this.minion2) break;
          else if (minions[i].userId === this.currentUser._id){
            this.minion1 = minions[i];
          }
          else if (minions[i].userId === this.enemy._id) {
            this.minion2 = minions[i];
          }
        }
      }

      this.attack(this.minion1, this.minion2);
    }

    let leftList = "";
    let rightList = "";

    for (let i= 0; i < this.result.split("\n").length; i++){
      if (i % 2 === 0){
        leftList += this.result.split("\n")[i] + "\n";
      }
      else {
        rightList += this.result.split("\n")[i] + "\n";
      }
    };
    

    return(
        <div className="vs">  
          <div className="textLog"> 
               
                <ul className="leftLog">   
                  {leftList.split("\n").map(line => {
                    return <li>
                      {line}
                    </li>
                  })}
                  <li>{this.victoryNotice}</li>
                </ul>

              <div className="versusNames">
                  {this.currentUser ? this.currentUser.username : null}
                {" vs "}
                {this.enemy ? this.enemy.username : null } <br></br>
                {this.minion1 ? this.minion1.name : null}
                {" vs "}
                {this.minion2 ? this.minion2.name : null} <br></br>
              </div>

                  <ul className="rightLog">
                  {rightList.split("\n").map(line => {
                    return <li>
                      {line}
                    </li>
                  })}
                </ul>
            </div>
          </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Versus);
