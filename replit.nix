{
  description = "A Node.js development environment";
  
  deps = [
    pkgs.nodejs-18_x
    pkgs.nodePackages.typescript
    pkgs.postgresql
    pkgs.yarn
    pkgs.replitPackages.jest
  ];
} 