const { dockerCliHelper, parseCliJSON } = require('../server/helpers/dockerCliHelper');

describe('Docker CLI Helper Unit Tests', () => {

  describe('parseCliJSON', () => {
    const fakeData = `{"CreatedAt":"2021-08-27 11:14:06 -0400 EDT","ID":"5e92d0ef966e","Image":"bobrik/socat","Labels":"desktop.docker.io/binds/0/Source=/var/run/docker.sock,desktop.docker.io/binds/0/SourceKind=dockerSocketProxied,desktop.docker.io/binds/0/Target=/var/run/docker.sock","LocalVolumes":"0","Mounts":"/run/host-serv…","Names":"socat","Networks":"bridge","Ports":"127.0.0.1:2375-\u003e2375/tcp","RunningFor":"8 days ago","Size":"0B (virtual 6.95MB)","State":"running","Status":"Up 23 hours"}`;
    const fakeMultilineData = `{"CreatedAt":"2021-08-27 11:14:06 -0400 EDT","ID":"5e92d0ef966e","Image":"bobrik/socat","Labels":"desktop.docker.io/binds/0/Source=/var/run/docker.sock,desktop.docker.io/binds/0/SourceKind=dockerSocketProxied,desktop.docker.io/binds/0/Target=/var/run/docker.sock","LocalVolumes":"0","Mounts":"/run/host-serv…","Names":"socat","Networks":"bridge","Ports":"127.0.0.1:2375-\u003e2375/tcp","RunningFor":"8 days ago","Size":"0B (virtual 6.95MB)","State":"running","Status":"Up 23 hours"}
    {"CreatedAt":"2021-08-27 11:14:06 -0400 EDT","ID":"5e92d0ef966e","Image":"bobrik/socat","Labels":"desktop.docker.io/binds/0/Source=/var/run/docker.sock,desktop.docker.io/binds/0/SourceKind=dockerSocketProxied,desktop.docker.io/binds/0/Target=/var/run/docker.sock","LocalVolumes":"0","Mounts":"/run/host-serv…","Names":"socat","Networks":"bridge","Ports":"127.0.0.1:2375-\u003e2375/tcp","RunningFor":"8 days ago","Size":"0B (virtual 6.95MB)","State":"running","Status":"Up 23 hours"}
    {"CreatedAt":"2021-08-27 11:14:06 -0400 EDT","ID":"5e92d0ef966e","Image":"bobrik/socat","Labels":"desktop.docker.io/binds/0/Source=/var/run/docker.sock,desktop.docker.io/binds/0/SourceKind=dockerSocketProxied,desktop.docker.io/binds/0/Target=/var/run/docker.sock","LocalVolumes":"0","Mounts":"/run/host-serv…","Names":"socat","Networks":"bridge","Ports":"127.0.0.1:2375-\u003e2375/tcp","RunningFor":"8 days ago","Size":"0B (virtual 6.95MB)","State":"running","Status":"Up 23 hours"}
    {"CreatedAt":"2021-08-27 11:14:06 -0400 EDT","ID":"5e92d0ef966e","Image":"bobrik/socat","Labels":"desktop.docker.io/binds/0/Source=/var/run/docker.sock,desktop.docker.io/binds/0/SourceKind=dockerSocketProxied,desktop.docker.io/binds/0/Target=/var/run/docker.sock","LocalVolumes":"0","Mounts":"/run/host-serv…","Names":"socat","Networks":"bridge","Ports":"127.0.0.1:2375-\u003e2375/tcp","RunningFor":"8 days ago","Size":"0B (virtual 6.95MB)","State":"running","Status":"Up 23 hours"}`
    it('should return an array', () => {
      expect(parseCliJSON(fakeData)).toBeInstanceOf(Array);
      expect(parseCliJSON(fakeMultilineData)).toBeInstanceOf(Array);
    })
    it('should work with single line data', () => {
      expect(parseCliJSON(fakeData)).toHaveLength(1);
    })
    it('should work with multi line data', () => {
      expect(parseCliJSON(fakeMultilineData)).toHaveLength(4);
    })
  })
})