import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/services/language/language.service';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit {
  textList: string[] = [
    'CEO DevFolio',
    'Web Developer',
    'Web Designer',
    'Backend Developer',
    'Frontend Developer',
    'Graphic Designer'
  ];
  currentText: string = ''; // Texte affiché actuellement
  typingIndex: number = 0; // Index pour l'effet de saisie
  textListIndex: number = 0; // Index du texte actuel
analyticsService: any;

  constructor() {}

  ngOnInit(): void {
    this.startTypingEffect();
  }

  startTypingEffect(): void {
    const typeText = () => {
      const fullText = this.textList[this.textListIndex]; // Texte complet actuel
      if (this.typingIndex < fullText.length) {
        this.currentText += fullText[this.typingIndex]; // Ajouter un caractère
        this.typingIndex++;
        setTimeout(typeText, 100); // Continuer à taper (ajuster la vitesse ici)
      } else {
        // Après avoir fini d'écrire, attendre et effacer
        setTimeout(() => {
          this.deleteText();
        }, 2000); // Pause après avoir écrit (2 secondes ici)
      }
    };

    typeText();
  }

  deleteText(): void {
    const deleteChar = () => {
      if (this.typingIndex > 0) {
        this.currentText = this.currentText.slice(0, -1); // Supprimer un caractère
        this.typingIndex--;
        setTimeout(deleteChar, 50); // Continuer à effacer (ajuster la vitesse ici)
      } else {
        // Passer au texte suivant
        this.textListIndex = (this.textListIndex + 1) % this.textList.length; // Cycle des textes
        setTimeout(() => {
          this.startTypingEffect();
        }, 500); // Pause avant de commencer le texte suivant
      }
    };

    deleteChar();
  }
}
