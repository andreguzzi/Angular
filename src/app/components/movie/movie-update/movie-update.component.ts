import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../../shared/shared.service';
import { Movie } from '../movie.model';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-update',
  templateUrl: './movie-update.component.html',
  styleUrls: ['./movie-update.component.css']
})
export class MovieUpdateComponent implements OnInit {

  movie: Movie = {
    title: "",
    director: "",
    year: "",
    generes: "",

  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService,
    private sharedService: SharedService,
    private fb: FormBuilder
  ) {}

  updateForm: FormGroup|any;

  ngOnInit(): void {
    const id:any = this.route.snapshot.paramMap.get("id")

    this.updateForm = this.fb.group({
      id: [""],
      title: ["", [Validators.required, Validators.minLength(4)]],
      director: ["", [Validators.required]],
      generes: ["", [Validators.required]],
      year: ["", [Validators.required]],
    });

    this.movieService.getById(id).subscribe((movie) => {
      this.updateForm.setValue({
        id: movie.id,
        title: movie.title,
        director: movie.director,
        year: movie.year,
        generes: movie.generes,

      });
    });
  }
  updateMovie() {
    if (this.updateForm.valid) {

      this.movieService.update(this.updateForm.value).subscribe(() => {
        this.sharedService.showMessage("Filme Alterado com sucesso!");
        this.router.navigate(["/movies"]);
      });
    }
  }
  cancel() {
    this.router.navigate(["/movies"]);
  }

}
