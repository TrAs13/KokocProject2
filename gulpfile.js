const gulp = require("gulp");
const del = require("del");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");
const sassGlob = require("gulp-sass-glob");
const autoprefixer = require("gulp-autoprefixer");
const gcmq = require("gulp-group-css-media-queries");
const cleanCSS = require("gulp-clean-css");
const pug = require("gulp-pug");
const concat = require("gulp-concat");
const babel = require("gulp-babel");
const gulpif = require("gulp-if");
const px2rem = require("gulp-px2rem");
const sassLint = require("gulp-sass-lint");

const { DIST_PATH, SRC_PATH } = require("./gulp.config");
const env = process.env.NODE_ENV;

/**
 * Очищаем папку dist
 */
const clean = () => {
  return del(`${DIST_PATH}`);
};

/**
 * Копируем все содержимое из папки src в dist
 */
const copyImg = () => {
  return gulp
    .src(`${SRC_PATH}/assets/**/*.*`)
    .pipe(gulp.dest(`${DIST_PATH}/images/`));
};

const copyFonts = () => {
  return gulp
    .src(`${SRC_PATH}/fonts/*.*`)
    .pipe(gulp.dest(`${DIST_PATH}/fonts/`));
};

/**
 * Запускаем сервер
 */
const server = (done) => {
  browserSync.init({
    server: {
      baseDir: `./${DIST_PATH}`,
    },
  });
  done();
};

const reload = (done) => {
  browserSync.reload();
  done();
};

const watchers = (done) => {
  gulp.watch(`${SRC_PATH}/styles/**/*.scss`, gulp.parallel(styles, stylesLint));
  gulp.watch(`${SRC_PATH}/js/*.js`, gulp.series(scripts));
  gulp.watch(`${SRC_PATH}/js/vendors/*.js`, gulp.series(vendorsScripts));
  gulp.watch(`${SRC_PATH}/**/*.pug`).on("all", gulp.series(compilePug, reload));
  gulp.watch(`${SRC_PATH}/assets/*.*`).on("all", gulp.series(copyImg, reload));
  gulp.watch(`${SRC_PATH}/fonts/*.*`).on("all", gulp.series(copyFonts, reload));
  done();
};

const styles = () => {
  return gulp
    .src(`${SRC_PATH}/styles/main.scss`)
    .pipe(gulpif(env === "dev", sourcemaps.init()))
    .pipe(sassGlob())
    .pipe(sass().on("error", sass.logError))
    .pipe(gulpif(env === "prod", gcmq()))
    .pipe(
      gulpif(
        env === "prod",
        autoprefixer({
          overrideBrowserslist: ["last 3 versions"],
          cascade: false,
        })
      )
    )
    .pipe(gulpif(env === "prod", px2rem()))
    .pipe(gulpif(env === "prod", cleanCSS({ compatibility: "ie8" })))
    .pipe(gulpif(env === "dev", sourcemaps.write()))
    .pipe(gulp.dest(`./${DIST_PATH}/styles`))
    .pipe(browserSync.stream()); // Перезагружаем локальный сервер
};

const stylesLint = () => {
  return gulp
    .src(`${SRC_PATH}/styles/**/*.scss`)
    .pipe(
      sassLint({
        configFile: ".sass-lint.yml",
      })
    )
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
};

const scripts = () => {
  return gulp
    .src(`${SRC_PATH}/js/*.js`)
    .pipe(gulpif(env === "dev", sourcemaps.init()))
    .pipe(concat("main.js"))
    .pipe(
      gulpif(
        env === "prod",
        babel({
          presets: ["@babel/env"],
        })
      )
    )
    .pipe(gulpif(env === "dev", sourcemaps.write()))
    .pipe(gulp.dest(`./${DIST_PATH}/js`))
    .pipe(browserSync.stream()); // Перезагружаем локальный сервер
};

const vendorsScripts = () => {
  return gulp
    .src(`${SRC_PATH}/js/vendors/*.js`)
    .pipe(gulpif(env === "dev", sourcemaps.init()))
    .pipe(concat("vendors.js"))
    .pipe(
      gulpif(
        env === "prod",
        babel({
          presets: ["@babel/env"],
        })
      )
    )
    .pipe(gulpif(env === "dev", sourcemaps.write()))
    .pipe(gulp.dest(`./${DIST_PATH}/js`))
    .pipe(browserSync.stream()); // Перезагружаем локальный сервер
};

const compilePug = () => {
  return gulp
    .src(`${SRC_PATH}/pages/*.pug`)
    .pipe(
      pug({
        pretty: true,
      })
    )
    .pipe(gulp.dest(`${DIST_PATH}`));
};

gulp.task(
  "build",
  gulp.series(
    clean,
    gulp.parallel(
      compilePug,
      styles,
      copyImg,
      copyFonts,
      scripts,
      vendorsScripts
    )
  )
);

gulp.task(
  "serve",
  gulp.series(
    clean,
    gulp.parallel(
      compilePug,
      styles,
      stylesLint,
      copyImg,
      copyFonts,
      scripts,
      vendorsScripts
    ),
    gulp.parallel(watchers, server)
  )
);
