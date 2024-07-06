import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-fab-button',
  templateUrl: './fab-button.component.html',
  styleUrls: ['./fab-button.component.scss']
})
export class FabButtonComponent {

  @Output() maisProximoEvent = new EventEmitter<void>();
  @Output() maisBemAvaliadasEvent = new EventEmitter<void>();

  onPertoClick() {
    this.maisProximoEvent.emit();
  }

  onMelhorAvaliadasClick() {
    this.maisBemAvaliadasEvent.emit();
  }

}
