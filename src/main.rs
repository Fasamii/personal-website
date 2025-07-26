use std::{fs::File, io::Read, net::Ipv4Addr, path::PathBuf};
use tiny_http::{Server, Response, Request, StatusCode};

fn main() {
    // Listen on all network interfaces
    let host = Ipv4Addr::UNSPECIFIED;
    let port = 8080;
    let server = Server::http((host, port)).unwrap();
    println!("🚀 Hosting on http://{}:{}/", host, port);

    for request in server.incoming_requests() {
        handle_request(request);
    }
}

fn handle_request(request: Request) {
    println!("{} => {} > {}",request.remote_addr().unwrap(), request.method(), request.url());
    let path = request.url().trim_start_matches('/');
    let mut path_buf = PathBuf::from("static");

    // Default to index.html
    if path.is_empty() {
        path_buf.push("index.html");
    } else {
        path_buf.push(path);
    }

    if path_buf.is_dir() {
        path_buf.push("index.html");
    }

    // Try to serve the file
    match File::open(&path_buf) {
        Ok(mut file) => {
            let mut content = Vec::new();
            let _ = file.read_to_end(&mut content);

            let mime = get_mime(&path_buf);
            let response = Response::from_data(content).with_header(
                tiny_http::Header::from_bytes(&b"Content-Type"[..], mime.as_bytes()).unwrap(),
            );
            let _ = request.respond(response);
        }
        Err(_) => {
            let _ = request.respond(Response::empty(StatusCode(404)));
        }
    }
}

fn get_mime(path: &PathBuf) -> &'static str {
    match path.extension().and_then(|s| s.to_str()) {
        Some("html") => "text/html",
        Some("css") => "text/css",
        Some("js") => "application/javascript",
        Some("png") => "image/png",
        Some("jpg") | Some("jpeg") => "image/jpeg",
        Some("svg") => "image/svg+xml",
        _ => "application/octet-stream",
    }
}
