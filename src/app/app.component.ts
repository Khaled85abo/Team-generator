import {
  trigger,
  state,
  transition,
  style,
  animate,
} from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateY(0)' })),
      transition('void => *', [
        style({ transform: 'translateY(-100%)' }),
        animate(100),
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'translateY(100%)' })),
      ]),
    ]),
  ],
})
export class AppComponent {
  title = 'tema-creator';
  members: string[] = [
    'Rebecca',
    'Oskar',
    'Marco',
    'Madeline',
    'Khaled',
    'Julia',
  ];
  member: string = '';
  membersPerTeam: number = 1;
  inputError: string | null = null;
  generateError: string | null = null;
  teams: string[][] = [];
  show: string = '';
  keyDown(e: KeyboardEvent) {
    this.inputError = null;
    if (e.code === 'Enter' && this.member.length > 0) this.addMember();
  }
  addMember() {
    const res = this.members
      .reduce((arr: string[], curr: string) => {
        arr.push(curr.toLocaleLowerCase());
        return arr;
      }, [])
      .includes(this.member.toLocaleLowerCase());
    if (res) {
      this.inputError = 'Member name already exists';
      return;
    }
    if (this.member.length === 0) return;
    this.members.push(this.member);
    this.member = '';
  }
  generateMembers() {
    console.log(this.members);
  }

  svgColor() {
    return 'red';
  }
  remove(index: number) {
    this.members.splice(index, 1);
  }
  generateKeyDown(event: KeyboardEvent) {
    if (event.code === 'Enter') this.generate();
  }
  generate() {
    console.log(this.members.length, this.membersPerTeam);
    if (this.members.length < this.membersPerTeam) {
      this.generateError = "There aren't enough members";
    }
    const newMembersArr = [...this.members];
    const teams = Math.floor(this.members.length / this.membersPerTeam);
    const teamsArray = [];
    for (let i = 0; i < teams; i++) {
      const team: string[] = [];
      for (let i = 0; i < this.membersPerTeam; i++) {
        const randomIndex = Math.floor(Math.random() * newMembersArr.length);
        team.push(newMembersArr[randomIndex]);
        newMembersArr.splice(randomIndex, 1);
      }
      teamsArray.push(team);
    }

    if (newMembersArr.length > 0) {
      for (let index in newMembersArr) {
        teamsArray[teamsArray.length - 1].push(newMembersArr[index]);
      }
    }

    console.log(teamsArray);
    this.teams = teamsArray;
  }
}
