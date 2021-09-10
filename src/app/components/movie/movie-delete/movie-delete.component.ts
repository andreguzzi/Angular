import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SharedService } from "../../shared/shared.service";
import { Movie } from "../movie.model";
import { MovieService } from "../movie.service";

@Component({
  selector: "app-movie-delete",
  templateUrl: "./movie-delete.component.html",
  styleUrls: ["./movie-delete.component.css"],
})
export class MovieDeleteComponent implements OnInit {
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
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");

    this.movieService.getById("id").subscribe((movie) => {
      this.movie = movie;
    });
  }

  updateMovie(): void {}

  deleteMovie(): void {
    this.movieService.delete(this.movie.id).subscribe(() => {
      this.sharedService.showMessage("Filme Removido com sucesso!");
      this.router.navigate(["/movies"]);
    });
  }

  cancel(): void {
    this.router.navigate(["/movies"]);
  }
}
