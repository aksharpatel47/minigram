import { createServer } from "http";
import * as postgraphql from "postgraphql";

createServer(postgraphql("postgres://aksharpatel@localhost:5432/minigram"));
