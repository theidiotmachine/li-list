import {Handlers, PageProps} from "$fresh/server.ts";
import SignupLink from "../components/SignupLink.tsx";



/* Configure password authentication strategy.
 *
 * The `LocalStrategy` authenticates users by verifying a username and password.
 * The strategy parses the username and password from the request and calls the
 * `verify` function.
 *
 * The `verify` function queries the database for the user record and verifies
 * the password by hashing the password supplied by the user and comparing it to
 * the hashed password stored in the database.  If the comparison succeeds, the
 * user is authenticated; otherwise, not.
 */
/*
passport.use(new LocalStrategy(function verify(username, password, cb) {
    db.get('SELECT * FROM users WHERE username = ?', [ username ], function(err, row) {
      if (err) { return cb(err); }
      if (!row) { return cb(null, false, { message: 'Incorrect username or password.' }); }
      
      crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
        if (err) { return cb(err); }
        if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
          return cb(null, false, { message: 'Incorrect username or password.' });
        }
        return cb(null, row);
      });
    });
  }));
*/


/* POST /signup
 *
 * This route creates a new user account.
 *
 * A desired username and password are submitted to this route via an HTML form,
 * which was rendered by the `GET /signup` route.  The password is hashed and
 * then a new user record is inserted into the database.  If the record is
 * successfully created, the user is logged in.
 */
/*
router.post('/signup', function(req, res, next) {
    var salt = crypto.randomBytes(16);
    crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', function(err, hashedPassword) {
      if (err) { return next(err); }
      db.run('INSERT INTO users (username, hashed_password, salt) VALUES (?, ?, ?)', [
        req.body.username,
        hashedPassword,
        salt
      ], function(err) {
        if (err) { return next(err); }
        var user = {
          id: this.lastID,
          username: req.body.username
        };
        req.login(user, function(err) {
          if (err) { return next(err); }
          res.redirect('/');
        });
      });
    });
  });
*/  

interface Data {
  redirect: string;
  failedString: string;
}

export const handler: Handlers = {
  GET(req, ctx) {
    
    const url = new URL(req.url);
    const redirect = url.searchParams.get("redirect") ?? "/";
    const failedString = url.searchParams.get("failed") ?? "";
    const data = {redirect, failedString};
    return ctx.render!(data);
  }
}

export default function Login(props: PageProps<Data>) {
    let error = "";
    let locked = false;
    switch(props.data.failedString) {
      case "":
        break;
      case "nousername":
        error = "Username not filled in.";
        break;
      case "nopassword":
        error = "Password not filled in.";
        break;
      case "failure":
        error = "Failed login.";
        break;
      case "locked":
        error = "Account temporarily locked, login attempt ignored.";
        locked = true;
        break;
      case "failureandlocked":
        error = "Failed login. Account temporarily locked.";
        locked = true;
        break;
      default:
        break;
    }

    return (
        <div class="flex flex-col items-center justify-center h-screen">
            <h1 class="text-4xl font-bold mb-4 dark:text-white">Login</h1>
            {
              (props.data.failedString != "")?(<div>
                <p class="text-red-600 dark:text-red-300 italic mb-4">{error}</p>
              </div>):(<div></div>)
            }
            <form action="/api/login" method="POST" class="flex flex-col space-y-4">
                <input type="text" name="username" placeholder="Username" class="border p-2 dark:bg-black dark:text-white " required autoFocus/>
                <input type="password" name="password" placeholder="Password" class="border p-2 dark:bg-black dark:text-white" required />
                <button type="submit" class="bg-blue-200 dark:bg-blue-800 p-2 disabled:text-gray-500 disabled:bg-gray-300 dark:text-white" 
                  disabled={locked}>Login</button>
                <input type="hidden" name="redirect" value={props.data.redirect} />
            </form>
            <p class="dark:text-white">Don't have a login? <SignupLink text="Sign up here"/>.</p>
        </div>
    );
}