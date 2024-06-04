import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-avaliacao',
  templateUrl: './avaliacao.component.html',
  styleUrls: ['./avaliacao.component.scss']
})
export class AvaliacaoComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  informacoesForm: FormGroup;
  medicines: string[] = ['Paracetamol', 'Ibuprofeno', 'Aspirina', 'Amoxicilina', 'Cetirizina'];
  rating: number = 0;
  medicationControl = new FormControl();
  filteredMedications: Observable<any[]>;

  medications: any[] = [
    { name: 'Atenolol 25mg', indication: 'Hipertensão' },
    { name: 'Besilato de Anlodipino 5mg', indication: 'Hipertensão' },
    { name: 'Captopril 25mg', indication: 'Hipertensão' },
    { name: 'Cloridrato de Propranolol 40mg', indication: 'Hipertensão' },
    { name: 'Espironolactona 25mg', indication: 'Insuficiência cardíaca' },
    { name: 'Furosemida 40mg', indication: 'Edema' },
    { name: 'Hidroclorotiazida 25mg', indication: 'Hipertensão' },
    { name: 'Losartana Potássica 50mg', indication: 'Hipertensão' },
    { name: 'Maleato de Enalapril 10mg', indication: 'Hipertensão' },
    { name: 'Succinato de Metoprolol 25mg', indication: 'Hipertensão' },
    { name: 'Cloridrato de Metformina 500mg', indication: 'Diabetes' },
    { name: 'Cloridrato de Metformina 850mg', indication: 'Diabetes' },
    { name: 'Glibenclamida 5mg', indication: 'Diabetes' },
    { name: 'Insulina Humana 100UI/ML', indication: 'Diabetes' },
    { name: 'Brometo de Ipratrópio 0,02mg', indication: 'Asma' },
    { name: 'Brometo de Ipratrópio 0,25mg', indication: 'Asma' },
    { name: 'Dipropionato de Beclometasona 200mcg', indication: 'Asma' },
    { name: 'Dipropionato de Beclometasona 250mcg', indication: 'Asma' },
    { name: 'Dipropionato de Beclometasona 50mcg', indication: 'Asma' },
    { name: 'Sulfato de Salbutamol 100mcg', indication: 'Asma' },
    { name: 'Sulfato de Salbutamol 5mg', indication: 'Asma' },
    { name: 'Acetato de Medroxiprogesterona 150mg', indication: 'Contracepção' },
    { name: 'Etinilestradiol 0,03mg + Levonorgestrel 0,15mg - 3 Cartelas com 21 Comprimidos', indication: 'Contracepção' },
    { name: 'Etinilestradiol 0,03mg + Levonorgestrel 0,15mg - Cartela com 21 Comprimidos', indication: 'Contracepção' },
    { name: 'Noretisterona 0,35mg', indication: 'Contracepção' },
    { name: 'Valerato de Estradiol 5mg + Enantato de Noretisterona 50mg', indication: 'Contracepção' },
    { name: 'Alendronato de Sódio 70mg', indication: 'Osteoporose' },
    { name: 'Absorvente', indication: 'Dignidade Menstrual' }
  ];
  
  selectedMedications: any[] = [];

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {

    this.filteredMedications = this.medicationControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filterMedications(value))
    );

    this.informacoesForm = this._formBuilder.group({
      name: ["", Validators.required],
      cpf: ["", [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/)]],
      birthDate: ["", Validators.required],
      // Campo do formulário para o rating
    });

    this.firstFormGroup = this._formBuilder.group({
      rating: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      queue: ['', Validators.required],
      service: ['', Validators.required],
      productAvailability: ['', Validators.required],
      productType: ['', Validators.required],
      horario: ['', Validators.required],

    });
    this.thirdFormGroup = this._formBuilder.group({
      medicines: [[], Validators.required]
    });
    this.fourthFormGroup = this._formBuilder.group({
      comments: ['']
    });
  }

  private _filterMedications(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.medications.filter(medication => medication.name.toLowerCase().includes(filterValue));
  }

  submitReview() {
    const reviewData = {
      rating: this.rating,
      structure: this.secondFormGroup.value,
      medicines: this.thirdFormGroup.value.medicines,
      comments: this.fourthFormGroup.value.comments,
      informacoes: this.informacoesForm.value
    };
    console.log('Review Data:', reviewData);
    // Lógica para enviar a avaliação ao servidor ou processá-la conforme necessário.
  }

  onRatingChanged(rating: number) {
    this.rating = rating;
    this.firstFormGroup.get("rating")?.setValue(rating);
    // Aqui você pode adicionar lógica para lidar com a alteração da nota
  }


  remove(medicine: any): void {
    this.selectedMedications = this.selectedMedications.filter(item => item !== medicine);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (!this.selectedMedications.includes(event.option.viewValue)) {
      this.selectedMedications.push(event.option.viewValue);
    }
    this.medicationControl.setValue("")

  }
  

}
